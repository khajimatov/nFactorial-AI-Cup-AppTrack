import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { OpenAIStream, type OpenAIStreamPayload } from "~/utils/OpenAIStream";

export const exampleRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const chat = await ctx.prisma.chat.findMany({
        where: {
          authorId: input.userId,
        },
        take: 100,
        orderBy: [{ createdAt: "asc" }],
      });

      return chat;
    }),

  submitTextPrompt: privateProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const post = await ctx.prisma.chat.create({
        data: {
          authorId,
          content: input.content,
        },
      });

      return post;
    }),

  chat: publicProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.content) {
        return new Response("No prompt in the request", { status: 400 });
      }

      const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input.content }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: true,
        n: 1,
      };

      const stream = await OpenAIStream(payload);
      return new Response(stream);
    }),
});

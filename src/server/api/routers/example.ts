import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

import { type OpenAIResponse, type OpenAIPayload } from "~/types/openai";

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

  chat: privateProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
      }

      if (!input.content) {
        return new Response("No prompt in the request", { status: 400 });
      }

      const payload: OpenAIPayload = {
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        messages: [
          {
            role: "system",
            content:
              "You are a trashtalker, joker, roasting VC and founder of successful startups. Your name is Arman Suleimenov",
          },
          { role: "user", content: input.content },
        ],
      };

      const res = (await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json())) as OpenAIResponse;

      const systemMessage = res.choices[0].message.content;
      // await ctx.prisma.chat.create({
      //   data: {
      //     authorId: ctx.userId,
      //     content: input.content,
      //     system: system,
      //   },
      // });
      return systemMessage;
    }),
});

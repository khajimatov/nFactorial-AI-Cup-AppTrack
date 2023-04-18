import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

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
      if (!input.content) {
        return new Response("No prompt in the request", { status: 400 });
      }

      const payload: any = {
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const res = await axios.post("https://api.openai.com/v1/chat/completions", payload, {
        headers: {
          "Content-Type": "application/json",
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      await ctx.prisma.chat.create({
        data: {
          authorId: ctx.userId,
          content: input.content,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          system: res.data.choices[0].message.content,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      // return res.data.choices[0].message.content as {
      //   data: { choices: { message: { content: string; system: string } }[] };
      // };
    }),
});

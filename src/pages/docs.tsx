import React from "react";

import { type NextPage } from "next";
import Head from "next/head";

import Nav from "~/components/Nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/accordion";

const Docs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Personas | Docs</title>
        <meta name="description" content="Personas FAQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <Nav />
        <h1 className="text-3xl font-bold mt-10 mb-10">Документация</h1>
        <Accordion type="single" collapsible className="w-[450px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Как взаимодействовать с Персонажем?</AccordionTrigger>
            <AccordionContent>
              Пока что только через текстовый чат. Только у некоторых Персонажей есть голосовой чат.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Как работает взаимодействие с Персонажем?</AccordionTrigger>
            <AccordionContent>
              Для распознования речи используется Whisper, LLM: gpt-3.5-turbo, LangChain для
              embeddings
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Использование бесплатное?</AccordionTrigger>
            <AccordionContent>
              Да, но с ограничениями. Например, вы не можете пока что создавать своих Персонажей,
              также есть ограничения на количество сообщений(максимум 10 сообщений).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
};

export default Docs;

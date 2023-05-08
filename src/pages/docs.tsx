import React from "react";

import { type NextPage } from "next";
import Head from "next/head";

import { useUser } from "@clerk/nextjs";

import Nav from "~/components/Nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/accordion";

const Docs: NextPage = () => {
  const { user, isSignedIn } = useUser();

  if (isSignedIn && !user) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Persóna Docs</title>
        <meta name="description" content="Persóna Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <Nav user={user} isSignedIn={isSignedIn} />
        <h1 className="text-3xl font-bold mt-10 mb-10">Documentation</h1>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-[500px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are limitations?</AccordionTrigger>
            <AccordionContent>
              For now only through a text chat. Only some Characters have a voice chat.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How to disable Roast mode?</AccordionTrigger>
            <AccordionContent>
              Roast mode is temporarily the default mode. But you can set different mode
              VC&nbsp;Simulator in chat settings
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
};

export default Docs;

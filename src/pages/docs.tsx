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
        <title>Persóna Docs</title>
        <meta name="description" content="Persóna Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <Nav user={undefined} isSignedIn={undefined} />
        <h1 className="text-3xl font-bold mt-10 mb-10">Documentation</h1>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-[450px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are limitations?</AccordionTrigger>
            <AccordionContent>
              For now only through a text chat. Only some Characters have a voice chat.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
};

export default Docs;

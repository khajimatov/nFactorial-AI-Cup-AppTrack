import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "~/components/button";

const PersonaCard = ({ isSignedIn }: { isSignedIn: boolean | undefined }) => {
  const router = useRouter();
  return (
    <>
      <div className="max-w-sm bg-white w-[300px] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image
          className="rounded-t-lg w-full h-[200px] object-cover object-center"
          src="/arman.png"
          alt="Arman Suleimenov"
          width={300}
          height={150}
        />
        <div className="p-5">
          <span className="bg-green-100 rounded-full text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">
            VOICE
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            EMBEDDING
          </span>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Arman Suleimenov</h4>
          <p className="leading-7 text-sm [&:not(:first-child)]:mt-3">
            Чат с Арманом, есть голосовой интерфейс
          </p>
          <Button
            disabled={!isSignedIn}
            className="w-full mt-4"
            variant="default"
            onClick={() => void router.push("/arman")}
          >
            {isSignedIn ? "Начать чат" : "Войдите чтобы начать"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PersonaCard;

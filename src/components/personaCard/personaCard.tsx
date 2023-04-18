import React, { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import styled from "~/components/personaCard/index.module.css";

import armanPic from "../../../public/arman.png";

const PersonaCard = ({ isSignedIn }: { isSignedIn: boolean | undefined }) => {
  const router = useRouter();
  const [disableChatButton, setDisableChatButton] = React.useState(false);
  useEffect(() => {
    const UPDATE = ({ x, y }: { x: number; y: number }) => {
      document.documentElement.style.setProperty("--rx", `${x / window.innerWidth}`);
      document.documentElement.style.setProperty("--x", `${x}`);
      document.documentElement.style.setProperty("--y", `${y}`);
    };

    document.body.addEventListener("pointermove", UPDATE);
    return () => document.body.removeEventListener("pointermove", UPDATE);
  }, []);
  return (
    <>
      <div className="max-w-sm bg-white w-[300px] border border-gray-200 rounded-lg shadow">
        <div className="w-[300px]">
          <Image
            className="rounded-t-lg w-full h-[200px] object-cover object-center"
            src={armanPic}
            alt="Arman Suleimenov"
            width={300}
            height={150}
            priority
          />
        </div>
        <div className="p-5">
          <span className="bg-green-100 rounded-full text-green-800 text-xs font-medium mr-2 px-2.5 py-1">
            VOICE
          </span>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Arman Suleimenov</h4>
          <p className="leading-7 text-sm [&:not(:first-child)]:mt-3">
            Chat with Arman Suleimenov, includes voice interaction
          </p>
          <button
            disabled={!isSignedIn || disableChatButton}
            className={styled.dark}
            onClick={() => {
              setDisableChatButton(true);
              void router.push("/arman");
            }}
          >
            <span className={styled.backdrop}></span>
            <span className={styled.text}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styled.thatSvg}
              >
                <path
                  className={styled.thatPath}
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                  clipRule="evenodd"
                />
              </svg>
              {isSignedIn ? "Chat with Arman" : "Sign in to chat"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonaCard;

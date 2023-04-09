import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import useRecorder from "~/hooks/use-recorder";
import useRecordingsList from "~/hooks/use-recordings-list";
import { api } from "~/utils/api";
import { formatMinutes, formatSeconds } from "~/utils/format-time";

import { type UseRecorder } from "~/types/recorder";

import Nav from "~/components/Nav";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

const Arman: NextPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const [input, setInput] = useState("");

  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;

  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;

  const { recordings, deleteAudio } = useRecordingsList(audio);

  const lastRecording = recordings[recordings.length - 1];
  function deleteAudios() {
    recordings.forEach((record) => {
      deleteAudio(record.key);
    });
  }
  function startThatRecording() {
    deleteAudios();
    startRecording();
  }

  const ctx = api.useContext();

  const { mutate } = api.example.submitTextPrompt.useMutation({
    onSuccess: () => {
      setInput("");
      // void ctx.example.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });
  const { data } = api.example.getAll.useQuery(
    { userId: user?.id ? user.id : "" },
    { enabled: isLoaded && user?.id !== undefined }
  );
  const { data: daata } = api.example.chat.useQuery({ content: "Hello" });

  return (
    <>
      <Head>
        <title>Arman Suleimenov</title>
        <meta name="description" content="Chat with Arman" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {isSignedIn ? (
        <div className="flex flex-col md:flex-row w-[1000px] m-auto items-center p-[20px] gap-6">
          <Image
            className="rounded-2xl shadow"
            src="/arman.png"
            alt="Arman Suleimenov"
            width={300}
            height={300}
          />
          <div className="flex flex-col gap-2">
            <div className="h-[500px] overflow-auto w-[600px] bg-slate-200 rounded-lg">
              <div className="w-full bg-blue-200 p-2 px-4 py-2 text-gray-900 sticky top-0">
                Чат с Арманом
              </div>
              {data?.map((message) => (
                <div key={message.id}>
                  {message.content}: {message.authorId}
                </div>
              ))}
            </div>
            {initRecording && (
              <>
                Идет запись {formatMinutes(recordingMinutes)}:{formatSeconds(recordingSeconds)}
              </>
            )}
            {!initRecording && recordings.length > 0 && (
              <div className="flex gap-2">
                <audio controls src={lastRecording?.audio} />
                <Button
                  className="border-red-200 text-red-500"
                  variant="outline"
                  onClick={deleteAudios}
                >
                  Удалить
                </Button>
              </div>
            )}
            <div className="flex justify-center gap-2">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (input !== "") {
                      mutate({ content: input });
                    }
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                name="prompt"
                disabled={initRecording || recordings.length > 0}
                placeholder={
                  recordings.length > 0
                    ? "Нажмите отправить чтобы отправить голос"
                    : "Отправьте сообщение Арману"
                }
              />
              <div>
                <Button
                  variant={initRecording ? "destructive" : "outline"}
                  onClick={initRecording ? saveRecording : startThatRecording}
                >
                  <svg
                    width="24px"
                    height="24px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#FFF"
                  >
                    <rect
                      x="9"
                      y="2"
                      width="6"
                      height="12"
                      rx="3"
                      stroke="#000000"
                      strokeWidth="1.5"
                    ></rect>
                    <path
                      d="M5 10v1a7 7 0 007 7v0a7 7 0 007-7v-1M12 18v4m0 0H9m3 0h3"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </Button>
              </div>
              <div>
                <Button onClick={() => mutate({ content: input })}>Отправить</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="leading-7 text-center mt-16">Войдите, чтобы начать общение с Арманом</p>
        </div>
      )}
    </>
  );
};

export default Arman;

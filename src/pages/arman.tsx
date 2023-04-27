import { useEffect, useState, useRef } from "react";

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

import armanPFP from "../../public/arma-pfp.jpg";

type Message = {
  content: string;
  sender: "user" | "system";
};
const initialMessages: Message[] = [
  {
    content:
      "Hi there! I'm Arman, the creator of this website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "system",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
  {
    content:
      "Hi Arman! I'm a user of your website. I'm a full-stack developer and I love to build things. I'm currently working on a few projects, including this website. I'm also a huge fan of the web and I love to learn new things. I'm currently learning about web audio and I'm having a lot of fun with it. I hope you enjoy this website and I hope you have a great day!",
    sender: "user",
  },
];

const Arman: NextPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;

  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;

  const { recordings, deleteAudio } = useRecordingsList(audio);

  const lastRecording = recordings[recordings.length - 1];

  const chatUIRef = useRef<HTMLDivElement>(null);

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

  const { mutate, data } = api.example.chat.useMutation({
    onSuccess: () => {
      if (data) {
        console.log(data);
      } else {
        console.log("no data");
      }
      toast.success("Message sent!");
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

  // const { data } = api.example.getAll.useQuery(
  //   { userId: user?.id ? user.id : "" },
  //   { enabled: isLoaded && user?.id !== undefined, refetchOnWindowFocus: false }
  // );

  function handleSubmit() {
    if (input.trim() === "") {
      toast.error("Please enter a message");
    } else {
      setInput("");
      setMessages((prev) => [...prev, { content: input, sender: "user" }]);
      // mutate({ content: input });
    }
  }
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [isLoaded]);

  useEffect(() => {
    chatUIRef.current?.scrollTo({
      top: chatUIRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isLoaded, messages]);

  return (
    <>
      <Head>
        <title>Chat with Arman</title>
        <meta name="description" content="Chat with Arman" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        body {
          padding-bottom: 0;
        }
      `}</style>
      <Nav user={user} isSignedIn={isSignedIn} />
      {isSignedIn ? (
        <div className="flex flex-col gap-2 w-[700px] max-h-screen h-screen mx-auto mt-10 py-4">
          <div
            ref={chatUIRef}
            className="scrolly flex flex-col overflow-auto h-full w-[700px] bg-slate-200 rounded-lg"
          >
              <div className="flex items-center gap-4 w-full px-4 py-4 backdrop-blur-sm backdrop-saturate-[180%] bg-slate-200/80 text-black font-medium border-[#fff] border-b-2 sticky top-0">
                <Image
                  className="w-[40px] h-[40px] rounded-full shadow"
                  src={armanPFP}
                  alt="Arman Suleimenov"
                  width={40}
                  height={40}
                />
                Arman
            </div>
            <div className="flex flex-col flex-grow justify-end gap-4 w-full [&>*:nth-child(odd)]:self-end [&>*:nth-child(odd)]:rounded-br-[4px] [&>*:nth-child(odd)]:bg-sky-500 [&>*:nth-child(odd)]:text-white [&>*:nth-child(even)]:self-start [&>*:nth-child(even)]:rounded-bl-[4px] [&>*:nth-child(even)]:bg-slate-300 p-2">
              {messages.map((m, index) => {
                return (
                  <div
                    key={index}
                    className="py-2 px-4 w-fit max-w-[500px] rounded-2xl animate-slideup"
                  >
                    {m.content}
                  </div>
                );
              })}
            </div>
            {/* {data?.map((message) => (
              <div key={message.id}>
                Me:{message.content}
                <br />
                Arman:{message.system}
                <hr />
              </div>
            ))} */}
          </div>
          {initRecording && (
            <>
              Recording: {formatMinutes(recordingMinutes)}:{formatSeconds(recordingSeconds)}
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
                Delete
              </Button>
            </div>
          )}
          <div className="flex justify-center gap-2">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              name="prompt"
              autoFocus
              disabled={initRecording || recordings.length > 0}
              placeholder={
                recordings.length > 0 ? "Click send to send voice message" : "Type your message..."
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
              <Button onClick={handleSubmit}>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#fff"
                >
                  <path
                    d="M22 12L3 20l3.563-8L3 4l19 8zM6.5 12H22"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="leading-7 text-center mt-16">
            Sign in to chat with
            <Image
              className="rounded-full inline"
              src={armanPFP}
              alt="Arman Suleimenov"
              width={40}
              height={40}
            />
            Arman
          </p>
        </div>
      )}
    </>
  );
};

export default Arman;

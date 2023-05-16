import { useEffect, useState, useRef } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import { Wand2, MoreVertical } from "lucide-react";
import { toast } from "react-hot-toast";
import useRecorder from "~/hooks/use-recorder";
import useRecordingsList from "~/hooks/use-recordings-list";
import { api } from "~/utils/api";
import { formatMinutes, formatSeconds } from "~/utils/format-time";

import { type UseRecorder } from "~/types/recorder";

import Nav from "~/components/Nav";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "~/components/popover";
import { Switch } from "~/components/switch";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/tooltip";

import armanPFP from "../../public/arma-pfp.jpg";

type Message = {
  content: string;
  role: "user" | "assistant";
};

const initialMessages: Message[] = [
  {
    content: "Sup, It's Arman, I'm here to roast you",
    role: "assistant",
  },
];

const Arman: NextPage = () => {
  const { user, isSignedIn, isLoaded: isUserLoaded } = useUser();

  const [input, setInput] = useState("");
  const [isRoastMode, setIsRoastMode] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;

  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;

  const { recordings, deleteAudio } = useRecordingsList(audio);

  const lastRecording = recordings[recordings.length - 1];

  const chatUIRef = useRef<HTMLDivElement>(null);
  const sendSoundEffect = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const { mutate, isLoading: isMutationLoading } = api.example.chat.useMutation({
    onSuccess(data) {
      if (typeof data === "string") {
        fireSendSoundEffect();
        setMessages((prev) => [...prev, { content: data, role: "assistant" }]);
      }
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
  //   { enabled: isUserLoaded && user?.id !== undefined, refetchOnWindowFocus: false }
  // );

  function handleSubmit() {
    if (input.trim() === "") {
      toast.error("Please enter a message");
    } else {
      setInput("");
      inputRef.current?.blur();
      fireSendSoundEffect();
      setMessages((prev) => [...prev, { content: input, role: "user" }]);
      mutate(messages.concat({ content: input, role: "user" }));
    }
  }
  function fireSendSoundEffect() {
    if (sendSoundEffect.current) {
      if (sendSoundEffect.current.paused) {
        sendSoundEffect.current.currentTime = 0;
      }
      sendSoundEffect.current.pause();
      sendSoundEffect.current.currentTime = 0;
      sendSoundEffect.current.volume = 0.2;
      void sendSoundEffect.current.play();
    }
  }
  ``;
  useEffect(() => {
    chatUIRef.current?.scrollTo({
      top: chatUIRef.current.scrollHeight,
      behavior: "smooth",
    });
    window.scrollTo(0, document.body.scrollHeight);
  }, [isUserLoaded, messages]);

  useEffect(() => {
    fireSendSoundEffect();
    setMessages(initialMessages);
  }, []);

  return (
    <>
      <Head>
        <title>Chat with Arman</title>
        <meta name="description" content="Chat with Arman" />
        <link rel="icon" href={armanPFP.src} />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <style jsx global>{`
        body {
          padding-bottom: 0;
        }
      `}</style>
      <main className="h-[100svh]">
        <Nav user={user} isSignedIn={isSignedIn} />
        {isSignedIn ? (
          <div className="flex flex-col gap-2 w-full sm:w-[700px] h-full mx-auto py-4">
            <audio
              ref={sendSoundEffect}
              preload="auto"
              src="https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"
            ></audio>
            <div
              ref={chatUIRef}
              className="scrolly flex flex-col overflow-auto w-full h-full sm:w-[700px] bg-slate-200 rounded-lg"
            >
              <div className="flex items-center justify-between w-full px-4 py-4 backdrop-blur-sm backdrop-saturate-[180%] bg-slate-200/80 text-black font-medium border-[#f8f8f8] border-b-2 sticky top-0">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-[40px] h-[40px] rounded-full shadow"
                    src={armanPFP}
                    alt="Arman Suleimenov"
                    width={40}
                    height={40}
                  />
                  Arman
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-10 rounded-full p-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open chat settings popover</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-70 bg-white">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <h4 className="font-medium leading-none">Chat settings</h4>
                          <Wand2 size={16} color="hsla(var(--popover-foreground))" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Customize your chat experience
                        </p>
                      </div>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2">
                              <Switch id="roast-mode" disabled checked={isRoastMode} />
                              <Label htmlFor="roast-mode">Roast Mode</Label>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <TooltipArrow
                              fill="white"
                              strokeWidth="1px"
                              stroke="hsl(var(--border))"
                            />
                            Roast mode is temporarily enabled by default
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="vc-simulator-mode"
                          checked={!isRoastMode}
                          onCheckedChange={() => {
                            setIsRoastMode((prev) => !prev);
                          }}
                        />
                        <Label htmlFor="vc-simulator-mode">VC Simulator Mode</Label>
                      </div>
                    </div>
                    <PopoverArrow fill="white" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col flex-grow justify-end gap-4 w-full [&>*:nth-child(even)]:self-end [&>*:nth-child(even)]:rounded-br-[2px] [&>*:nth-child(even)]:bg-sky-500 [&>*:nth-child(even)]:text-white [&>*:nth-child(odd)]:self-start [&>*:nth-child(odd)]:rounded-bl-[2px] [&>*:nth-child(odd)]:bg-slate-300 p-2">
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
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isMutationLoading) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                inputMode="text"
                name="prompt"
                autoFocus
                disabled={initRecording || recordings.length > 0}
                placeholder={
                  recordings.length > 0
                    ? "Click the button to send voice message"
                    : "Type your message..."
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
                <Button onClick={handleSubmit} disabled={isMutationLoading}>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
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
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="leading-7 text-center mt-16">Sign in to chat with</p>
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full inline"
                src={armanPFP}
                alt="Arman Suleimenov"
                width={38}
                height={38}
              />
              Arman
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Arman;

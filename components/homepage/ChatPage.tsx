"use client";

import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { twMerge } from "tailwind-merge";
import Markdown from "../common/Markdown";

import { chanceObj } from "@/utils/functions/chance";
import actionsDirectory from "@/utils/functions/actionsDirectory";

type Messages = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}[];

type Conversation = {
  session_id: string;
  expires_at: number;
  messages: Messages;
};

const ChatPage = ({ messages: initialMessages }: { messages: string[] }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Messages>([]);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
      messagesContainer.scrollTo({ top: messagesContainer.scrollHeight + 1000000, behavior: "smooth" });
    }
  };

  const getSession = () => {
    // const session = window.localStorage.getItem("chat-session");
    if (!session) {
      const newSession = chanceObj.guid();
      // window.localStorage.setItem("chat-session", newSession);
      setSession(newSession);
      return newSession;
    }

    return session;
  };

  const updateLocalConversation = (conversation: Conversation) => {
    window.localStorage.setItem("chat-conversation", JSON.stringify(conversation));
  };

  const getLocalConversation = () => {
    const conversation = window.localStorage.getItem("chat-conversation");
    if (conversation) {
      const parsed = JSON.parse(conversation) as Conversation;
      if (parsed.expires_at > moment().unix()) {
        window.localStorage.removeItem("chat-conversation");
        return parsed;
      }
    }
    return undefined;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") return;
    if (awaitingResponse) return;

    setAwaitingResponse(true);

    const newMessage = message.trim();

    let conversation: Conversation = {
      session_id: getSession(),
      expires_at: moment().add(1, "hour").unix(),
      messages: [...messages, { role: "user", content: newMessage, timestamp: moment().format("YYYY-MM-DD HH:mm:ss") }],
    };

    const currentConversation = getLocalConversation();
    if (currentConversation) {
      conversation.session_id = currentConversation.session_id;
      conversation.expires_at = currentConversation.expires_at;
    }

    setMessage("");
    setMessages(conversation.messages);
    updateLocalConversation(conversation);
    setTimeout(scrollToBottom, 10);

    const session = getSession();
    const data = await actionsDirectory("chat", { message: newMessage, session_id: session });

    if (data.success) {
      conversation.messages.push({ role: "assistant", content: data.data.response, timestamp: moment().format("YYYY-MM-DD HH:mm:ss") });
      conversation.expires_at = data.data.expire;
      setMessages(conversation.messages);
      updateLocalConversation(conversation);
      setTimeout(scrollToBottom, 10);
    }

    setAwaitingResponse(false);
  };

  useEffect(() => {
    const currentConversation = getLocalConversation();
    if (currentConversation) {
      setMessages(currentConversation.messages);
      setSession(currentConversation.session_id);
    }

    window.addEventListener("keydown", (e) => {
      const input = document.getElementById("message-input") as HTMLInputElement;
      input.focus();
    });
  }, []);

  return (
    <div className=" -m-5 -mt-32 pt-32 flex flex-col items-center gap-20 h-screen p-10 xs:p-5">
      <div className="h-full flex flex-col gap-5 justify-end w-2/3 xs:w-full ">
        <div id="messages" className=" flex flex-col justify-end gap-2 overflow-scroll h-full xs:mt-36">
          {messages.length === 0 && (
            <div className="p-3 h-full flex flex-col items-center justify-center gap-2 ">
              <small className="text-gray-500">Talk to Farish's AI twin.</small>
              <button
                type="button"
                className="bg-gray-100 rounded-full py-1 px-4 flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                onClick={() => {
                  const input = document.getElementById("message-input") as HTMLInputElement;
                  input.focus();
                }}
              >
                <small>Start Chat</small>
              </button>

              <div className="flex flex-col mt-5 items-center gap-4">
                <small className="text-gray-500">Or try these messages</small>
                <div className="flex flex-wrap justify-center gap-2 ">
                  {initialMessages.map((message) => (
                    <button
                      type="button"
                      key={chanceObj.guid()}
                      className="bg-gray-100 rounded-full py-1 px-4  flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                      onClick={() => {
                        setMessage(message);
                        const input = document.getElementById("message-input") as HTMLInputElement;
                        input.focus();
                      }}
                    >
                      <small>{message}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={chanceObj.guid()}
              className={twMerge(
                "p-3 flex items-center gap-2 border border-gray-200 rounded-lg justify-start ",
                message.role === "assistant" && "bg-gray-100 "
              )}
            >
              <div className="flex flex-col gap-1 w-full">
                <small className="text-gray-500 text-[10px] uppercase w-full">{message.role === "user" ? "You" : "Farish AI"}</small>
                {/* <span className="">{message.content}</span> */}
                <Markdown text={message.content} />
                <small className="text-gray-500 text-[10px]">{moment(message.timestamp).format("DD MMM YYYY • HH:mm:ss")}</small>
              </div>
            </div>
          ))}
        </div>

        <form className="flex gap-2 items-center h-8" onSubmit={onSubmit}>
          <input
            id="message-input"
            type="text"
            className="w-full rounded-xl h-full p-5 ring-0 outline-none border"
            placeholder="Type your message here..."
            autoFocus
            // autoCorrect="off"
            autoComplete="off"
            value={message}
            maxLength={120}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-200 rounded-full border border-gray-300 h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
          >
            <SendIcon size={16} />
          </button>
        </form>

        <div className="text-center text-gray-500 text-[12px]">
          <small>I can make mistakes sometimes, please forgive me.</small>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

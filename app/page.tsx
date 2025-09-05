import React from "react";

import ChatPage from "@/components/homepage/ChatPage";
import { chanceObj } from "@/utils/functions/chance";

const page = () => {
  const messages = chanceObj.shuffle([
    "Tell me about yourself",
    "Where do you work?",
    "How old are you?",
    "Who are you?",
    "What's your mission?",
    "How do i contact you?",
  ]);

  const last3Messages = messages.slice(0, 3);

  return <ChatPage messages={last3Messages} />;
};

export default page;

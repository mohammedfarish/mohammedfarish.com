"use client";

import { SendIcon, Wifi, Signal, Battery } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

import Markdown from "../common/Markdown";
import { chanceObj } from "@/utils/functions/chance";
import { responderAvatarImage } from "@/utils/data";
import actionsDirectory from "@/utils/functions/actionsDirectory";

type Messages = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  timeTaken?: string;
  id?: string;
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
  const [chatStartTime, setChatStartTime] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shouldAutoScroll = useRef(true);
  const previousMessageIds = useRef<Set<string>>(new Set());
  const newMessageIds = useRef<Set<string>>(new Set());
  const isInitialMount = useRef(true);

  const isClient = typeof window !== "undefined";

  const scrollToBottom = (smooth = false) => {
    if (messagesContainerRef.current && shouldAutoScroll.current) {
      if (smooth) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        requestAnimationFrame(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        });
      }
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      shouldAutoScroll.current = scrollHeight - scrollTop - clientHeight < 100;
    }
  };

  const getSession = () => {
    if (!session) {
      const newSession = chanceObj.guid();
      setSession(newSession);
      return newSession;
    }
    return session;
  };

  const updateLocalConversation = (conversation: Conversation) => {
    if (!isClient) return;
    try {
      const currentUnix = moment().unix();
      if (conversation.expires_at < currentUnix) {
        window.localStorage.removeItem("chat-conversation");
        setMessages([]);
        setSession("");
        return;
      }
      window.localStorage.setItem("chat-conversation", JSON.stringify(conversation));
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  };

  const getLocalConversation = () => {
    if (!isClient) return undefined;
    try {
      const conversation = window.localStorage.getItem("chat-conversation");
      if (conversation) {
        const parsed = JSON.parse(conversation) as Conversation;
        const currentUnix = moment().unix();
        if (parsed.expires_at < currentUnix) {
          window.localStorage.removeItem("chat-conversation");
          setMessages([]);
          setSession("");
          return undefined;
        }
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
      window.localStorage.removeItem("chat-conversation");
    }
    return undefined;
  };

  const clearExpiredConversation = () => {
    if (!isClient) return;
    try {
      const conversation = window.localStorage.getItem("chat-conversation");
      if (conversation) {
        const parsed = JSON.parse(conversation) as Conversation;
        const currentUnix = moment().unix();
        if (parsed.expires_at < currentUnix) {
          window.localStorage.removeItem("chat-conversation");
          setMessages([]);
          setSession("");
        }
      }
    } catch (error) {
      console.error("Failed to check conversation expiry:", error);
      window.localStorage.removeItem("chat-conversation");
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      const lineHeight = 20;
      const singleLineHeight = 44;
      const maxHeight = lineHeight * 3 + 24;
      
      if (scrollHeight <= singleLineHeight) {
        inputRef.current.style.height = `${singleLineHeight}px`;
        inputRef.current.style.overflowY = 'hidden';
      } else if (scrollHeight <= maxHeight) {
        inputRef.current.style.height = `${scrollHeight}px`;
        inputRef.current.style.overflowY = 'hidden';
      } else {
        inputRef.current.style.height = `${maxHeight}px`;
        inputRef.current.style.overflowY = 'auto';
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== inputRef.current) {

        const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
        
        const isSpecialKey = [
          'Escape', 'Tab', 'Enter', 'ArrowUp', 'ArrowDown', 
          'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 
          'PageDown', 'Insert', 'Delete', 'Backspace', 'F1', 
          'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 
          'F10', 'F11', 'F12'
        ].includes(e.key);

        if (isPrintable && !isSpecialKey) {
          e.preventDefault();
          
          if (inputRef.current) {
            inputRef.current.focus();
            
            const cursorPosition = inputRef.current.selectionStart || message.length;
            
            const newMessage = 
              message.slice(0, cursorPosition) + 
              e.key + 
              message.slice(cursorPosition);
            
            setMessage(newMessage);
            
            setTimeout(() => {
              if (inputRef.current) {
                const newPosition = cursorPosition + 1;
                inputRef.current.setSelectionRange(newPosition, newPosition);
              }
            }, 0);
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [message]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") return;
    if (awaitingResponse) return;

    setAwaitingResponse(true);

    const newMessage = message.trim();
    const messageId = chanceObj.guid();
    const messageTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    if (messages.length === 0 && !chatStartTime) {
      setChatStartTime(moment().format("h:mm"));
    }

    let conversation: Conversation = {
      session_id: getSession(),
      expires_at: moment().add(1, "hour").unix(),
      messages: [
        ...messages,
        { role: "user", content: newMessage, timestamp: messageTimestamp, id: messageId },
      ],
    };

    clearExpiredConversation();
    const currentConversation = getLocalConversation();
    if (currentConversation) {
      conversation.session_id = currentConversation.session_id;
      conversation.expires_at = currentConversation.expires_at;
    }

    setMessage("");
    if (inputRef.current) {
      inputRef.current.style.height = '44px';
      inputRef.current.style.overflowY = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    newMessageIds.current.add(messageId);
    setMessages(conversation.messages);
    updateLocalConversation(conversation);
    shouldAutoScroll.current = true;
    setTimeout(() => scrollToBottom(true), 100);

    const session = getSession();
    const data = await actionsDirectory("chat", { message: newMessage, session_id: session });

    if (data.success) {
      const assistantMessageId = chanceObj.guid();
      conversation.messages.push({
        role: "assistant",
        content: data.data.response,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        timeTaken: data.timeTaken,
        id: assistantMessageId,
      });
      newMessageIds.current.add(assistantMessageId);
      conversation.expires_at = data.data.expire;
      setMessages(conversation.messages);
      updateLocalConversation(conversation);
      shouldAutoScroll.current = true;
      setTimeout(() => scrollToBottom(true), 100);
    }

    setAwaitingResponse(false);
  };

  useEffect(() => {
    const styleId = 'chat-page-fullscreen-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      body > div:first-child:not([style*="zIndex"]) {
        display: none !important;
      }
      body > div:nth-child(2) {
        padding: 0 !important;
        margin: 0 !important;
      }
      body {
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        overscroll-behavior: none !important;
      }
      html {
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        overscroll-behavior: none !important;
      }
      div[data-chat-container] {
        width: 100vw !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        transform: none !important;
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
        position: fixed !important;
        overscroll-behavior: none !important;
      }
      @media (min-width: 926px) {
        div[data-chat-container] {
          width: 50vw !important;
          max-width: 50vw !important;
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%) !important;
        }
        div[data-chat-container] > div:first-child {
          width: 100vw !important;
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%) !important;
          margin-left: -50vw !important;
          margin-right: -50vw !important;
        }
        div[data-chat-container] form > div {
          max-width: 600px !important;
        }
        div[data-chat-container] [class*="rounded-[18px]"] {
          max-width: 500px !important;
        }
      }
    `;

    clearExpiredConversation();
    
    const currentConversation = getLocalConversation();
    if (currentConversation) {
      setMessages(currentConversation.messages);
      setSession(currentConversation.session_id);
      currentConversation.messages.forEach(msg => {
        if (msg.id) {
          previousMessageIds.current.add(msg.id);
        }
      });
      if (currentConversation.messages.length > 0) {
        const firstMessage = currentConversation.messages[0];
        setChatStartTime(moment(firstMessage.timestamp).format("h:mm"));
      }
    } else {
      setMessages([]);
      setSession("");
      setChatStartTime(moment().format("h:mm"));
    }

    const input = document.getElementById("message-input") as HTMLInputElement;
    if (input) {
      input.focus();
    }

    const scrollTimeoutId = setTimeout(() => {
      shouldAutoScroll.current = true;
      scrollToBottom();
    }, 100);

    const preventViewportResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
    };

    const handleViewportResize = () => {
      preventViewportResize();
    };

    const preventPageScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target === document.body || target === document.documentElement || target.tagName === 'HTML') {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo(0, 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize);
    }
    window.addEventListener('resize', preventViewportResize);
    window.addEventListener('scroll', preventPageScroll, { passive: false, capture: true });
    preventViewportResize();

    return () => {
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      document.body.style.overflow = '';
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      window.removeEventListener('resize', preventViewportResize);
      window.removeEventListener('scroll', preventPageScroll, { capture: true } as any);
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      messages.forEach(msg => {
        if (msg.id) {
          previousMessageIds.current.add(msg.id);
        }
      });
      isInitialMount.current = false;
      return;
    }

    const clearNewIdsTimeout = setTimeout(() => {
      newMessageIds.current.forEach(id => {
        previousMessageIds.current.add(id);
      });
      newMessageIds.current.clear();
    }, 400);

    let scrollTimeoutId: NodeJS.Timeout | null = null;
    
    if (shouldAutoScroll.current) {
      scrollTimeoutId = setTimeout(() => scrollToBottom(true), 150);
    }
    
    return () => {
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
      if (clearNewIdsTimeout) {
        clearTimeout(clearNewIdsTimeout);
      }
    };
   }, [messages]);

  const groupMessagesByDate = (msgs: Messages) => {
    const groups: { date: string; messages: Messages }[] = [];
    let currentDate = "";

    msgs.forEach((msg) => {
      const msgDate = moment(msg.timestamp).format("YYYY-MM-DD");
      const displayDate = moment(msg.timestamp).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "dddd",
        sameElse: "MMM D, YYYY",
      });

      if (msgDate !== currentDate) {
        groups.push({ date: displayDate, messages: [msg] });
        currentDate = msgDate;
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };
  
  const messageGroups = groupMessagesByDate(messages);
  const showTimestampBanner = messages.length > 0;

  return (
    <div 
      data-chat-container
      className="flex flex-col fixed inset-0 bg-white overflow-hidden" 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
        height: '100dvh',
        zIndex: 100,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overscrollBehavior: 'none',
        touchAction: 'pan-y'
      }}
    >
      <div className="flex items-center justify-between px-4 xs:px-6 pt-3 pb-1.5 bg-white">
        <div className="text-[15px] font-semibold text-black">{chatStartTime || moment().format("h:mm")}</div>
        <div className="flex items-center gap-1.5">
          <Signal size={16} className="text-black" strokeWidth={2.5} />
          <Wifi size={16} className="text-black" strokeWidth={2.5} />
          <Battery size={20} className="text-black" strokeWidth={2.5} />
        </div>
      </div>

      <div
        id="messages"
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-white px-4 xs:px-4 py-3 pb-4 min-[926px]:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          paddingBottom: '1rem',
          maxWidth: '100%'
        }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full gap-4">
            <div className="text-center space-y-3">
              <div className="text-gray-400 text-[13px]">{moment().format("dddd h:mm A")}</div>
            </div>
            <div className="p-3 flex flex-col items-center justify-center gap-2">
              <small className="text-gray-500 text-[15px]">Talk to Farish's AI twin.</small>
              <button
                type="button"
                className="bg-blue-500 text-white rounded-full py-2 px-6 flex items-center justify-center hover:bg-blue-600 transition-all duration-200 text-[15px] font-medium"
                onClick={() => {
                  const input = document.getElementById("message-input") as HTMLInputElement;
                  input?.focus();
                }}
                aria-label="Start chat"
              >
                Start Chat
              </button>

              <div className="flex flex-col mt-5 items-center gap-4">
                <small className="text-gray-500 text-[13px]">Or try these messages</small>
                <div className="flex flex-wrap justify-center gap-2">
                  {initialMessages.map((msg, index) => (
                    <button
                      type="button"
                      key={`initial-msg-${index}`}
                      className="bg-gray-100 text-gray-900 rounded-full py-2 px-4 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 text-[15px]"
                      onClick={() => {
                        setMessage(msg);
                        const input = document.getElementById("message-input") as HTMLInputElement;
                        input?.focus();
                      }}
                      aria-label={`Try message: ${msg}`}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {showTimestampBanner && (
          <div className="text-center py-2">
            <div className="text-gray-400 text-[13px]">{moment().format("dddd h:mm A")}</div>
          </div>
        )}

        {messageGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && (
              <div className="text-center py-2">
                <div className="text-gray-400 text-[13px]">{group.date}</div>
              </div>
            )}
            {group.messages.map((msg, index) => {
              const isUser = msg.role === "user";
              const showAvatar = !isUser && (index === 0 || group.messages[index - 1].role === "user");
              const prevMessage = index > 0 ? group.messages[index - 1] : null;
              const nextMessage = index < group.messages.length - 1 ? group.messages[index + 1] : null;
              const isConsecutive = prevMessage && prevMessage.role === msg.role;
              const isLastInSequence = !nextMessage || nextMessage.role !== msg.role;

              const messageKey = msg.id || `msg-${groupIndex}-${index}`;
              const shouldAnimate = msg.id ? newMessageIds.current.has(msg.id) : false;
              
              return (
                <motion.div
                  key={messageKey}
                  initial={shouldAnimate ? { y: 10, opacity: 0 } : false}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.25, 
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.2 }
                  }}
                  layout
                  className={twMerge(
                    "flex w-full mb-3",
                    isUser ? "justify-end items-end" : "justify-start items-end"
                  )}
                  style={{ willChange: shouldAnimate ? 'transform, opacity' : 'auto' }}
                >
                  {!isUser && (
                    <div className="flex-shrink-0 mr-2 mb-1">
                      {showAvatar ? (
                        <img
                          src={responderAvatarImage}
                          alt="Farish AI"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7" />
                      )}
                    </div>
                  )}

                  <div className={twMerge("flex flex-col", isUser ? "items-end" : "items-start", !isUser && !showAvatar && "ml-9", "flex-1 min-w-0")}>
                    {!isUser && !isConsecutive && (
                      <div className="text-gray-600 text-[13px] font-medium mb-0.5 px-1">Farish AI</div>
                    )}
                    <div
                      className={twMerge(
                        "min-w-[80px] max-w-[75%] xs:max-w-[85%] min-[926px]:max-w-[500px] px-3 py-1.5 text-[17px] leading-[1.38] shadow-sm",
                        isUser
                          ? isLastInSequence
                            ? "bg-[#007AFF] text-white rounded-[18px] rounded-br-[4px]"
                            : "bg-[#007AFF] text-white rounded-[18px]"
                          : isLastInSequence
                            ? "bg-[#E9E9EB] text-black rounded-[18px] rounded-bl-[4px]"
                            : "bg-[#E9E9EB] text-black rounded-[18px]"
                      )}
                      style={{
                        ...(isUser 
                          ? { backgroundColor: '#007AFF' }
                          : { backgroundColor: '#E9E9EB' }
                        ),
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                        hyphens: 'none'
                      }}
                    >
                      <div className={twMerge(
                        isUser ? "text-white [&_*]:text-white [&_p]:m-0 [&_p]:leading-[1.38] [&_p]:break-words" : "text-black [&_p]:m-0 [&_p]:leading-[1.38] [&_p]:break-words",
                        "[&_p]:whitespace-normal [&_*]:whitespace-normal [&_p]:overflow-wrap-break-word"
                      )}>
                        <Markdown text={msg.content} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}

        {awaitingResponse && (
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.2 }
            }}
            layout
            className="flex items-end mb-1"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex-shrink-0 mr-2 mb-1">
              <img
                src={responderAvatarImage}
                alt="Farish AI"
                className="w-7 h-7 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600 text-[13px] font-medium mb-0.5 px-1">Farish AI</div>
              <div className="bg-gray-200 rounded-2xl rounded-bl-[4px] px-3 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div 
        className="relative pt-3 flex-shrink-0 min-[926px]:pb-3"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          marginBottom: 0,
          zIndex: 10,
          position: 'relative',
          backgroundColor: 'transparent'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 600% 200% at 50% 0%, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 255, 255, 0.999) 2%, 
                rgba(255, 255, 255, 0.995) 6%, 
                rgba(255, 255, 255, 0.985) 12%, 
                rgba(255, 255, 255, 0.96) 20%, 
                rgba(255, 255, 255, 0.92) 30%, 
                rgba(255, 255, 255, 0.85) 42%, 
                rgba(255, 255, 255, 0.7) 58%, 
                rgba(255, 255, 255, 0.5) 75%, 
                rgba(255, 255, 255, 0.25) 90%, 
                rgba(255, 255, 255, 0.08) 97%, 
                transparent 100%
              ),
              linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(240, 240, 245, 0.1) 55%, rgba(235, 235, 240, 0.3) 70%, rgba(229, 229, 234, 0.65) 88%, #E5E5EA 100%)
            `,
            backgroundBlendMode: 'lighten, normal',
            zIndex: 0
          }}
        />
        <div className="relative px-4 xs:px-4 min-[926px]:px-8 z-10">
        <form className="w-full max-w-full flex justify-center" onSubmit={onSubmit}>
          <div 
            className="rounded-[24px] px-4 flex items-center min-h-[44px] w-full"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <textarea
              ref={inputRef}
              id="message-input"
              className="flex-1 outline-none text-[17px] bg-transparent text-black placeholder:text-gray-500 w-full resize-none"
              placeholder="Chat Message"
              autoFocus
              autoComplete="off"
              value={message}
              maxLength={500}
              rows={1}
              style={{
                height: '44px',
                overflowY: 'hidden',
                minHeight: '44px',
                lineHeight: '20px',
                padding: '12px 0'
              }}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e as any);
                }
              }}
              onFocus={() => {
                shouldAutoScroll.current = true;
                setTimeout(() => scrollToBottom(true), 100);
              }}
              aria-label="Message input"
            />
            {message.trim() && !awaitingResponse && (
              <button
                type="submit"
                className="ml-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                aria-label="Send message"
              >
                <SendIcon size={16} className="text-white" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </form>
        <div className="text-center text-gray-600 text-[11px] mt-2 mb-0 px-2 opacity-85">
          I can make mistakes sometimes, please forgive me.
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import { useRef } from "react";
import { ChatConversation } from "./ChatConversation";
import { ChatInput } from "./ChatInput";
import { IChatUIProps } from "../types/index";

export function ChatUI({
    disabled,
    conversations,
    isQuerying,
    customSubmitIcon,
    placeholder,
    onSubmit,
}: IChatUIProps){
    const chatConversationsContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ height: "calc(100vh - 68px)" }}>
          <div
            ref={chatConversationsContainerRef}
            className="flex w-full justify-center overflow-y-auto pb-8"
            style={{ maxHeight: "calc(100vh - 250px)" }}
          >
            <ChatConversation
              conversations={conversations}
              isQuerying={isQuerying}
              chatConversationsContainerRef={chatConversationsContainerRef}
            />
          </div>
          <div className="absolute bottom-12 left-0 w-full">
            <ChatInput
              disabled={disabled}
              customSubmitIcon={customSubmitIcon}
              onSubmit={onSubmit}
              placeholder={placeholder}
            />
          </div>
        </div>
      );
}
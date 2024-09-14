import {RefObject, ReactNode} from "react";
import { MessageRole } from "../enums/MessageRole";

//defining data types for different usage

export type User = {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
};

export type Message = {
    id: string;
    role: MessageRole;
    message: string;
    userInfo?: User;
};

export type Conversations = Array<Message>;

//defining components interfaces
export interface IChatUIProps {
    isQuerying: boolean;
    onSubmit: (value) => void;
    placeholder: string;
    disabled: boolean;
    conversations: Conversations;
    customSubmitIcon?: ReactNode;
}

export interface IChatInputProps {
    disabled: boolean;
    onSubmit: (value) => void;
    placeholder: string;
    customSubmitIcon?: ReactNode;
}

export interface IChatConversationsProps {
    conversations: Conversations;
    isQuerying: boolean;
    chatConversationsContainerRef: RefObject<HTMLDivElement>;
}

export interface IChatMessageProps {
    message: Message;
}

//defining authentication interface
export interface RegisterFormProps {
    onRegister: (username: string, email: string, password: string) => void;
}
import { create } from "zustand";
import { produce } from "immer";

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
}

export interface ChatType {
  chats: ChatMessageType[];
  addChat: (chat: ChatMessageType, index?: number) => void;
  editChatMessage: (chat: string, updateIndex: number) => void;
  addNewChat: () => void;
}

export interface UserType {
  name: string;
  email: string;
  avatar: string;
}

export interface AuthType {
  token: string | null;
  setToken: (token: string) => void;
  setUSer: (user: { name: string; email: string; avatar: string }) => void;
  user: UserType;
}

const useChat = create<ChatType>((set) => ({
  chats: [],
  addChat: (chat: ChatMessageType, index?: number) => {
    set(
      produce((state: ChatType) => {
        if (index || index === 0) state.chats[index] = chat;
        else {
          state.chats.push(chat);
        }
      })
    );
  },
  editChatMessage: (chat, updateIndex) => {
    set(
      produce((state: ChatType) => {
        state.chats[updateIndex].content = chat;
      })
    );
  },
  addNewChat: () => {
    set(
      produce((state: ChatType) => {
        state.chats.length = 0;
      })
    );
  },
}));

const useAuth = create<AuthType>((set) => ({
  token: localStorage.getItem("token") || "",
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  setToken: (token: string) => {
    set(
      produce((state) => {
        state.token = token;
      })
    );
  },
  setUSer: (user: UserType) => {
    set(
      produce((state) => {
        state.user = user;
      })
    );
  },
}));

export const selectChatsIds = (state: ChatType) =>
  state.chats.map((chat) => {
    if (chat.role === "user") return chat.content;
  });
export const selectUser = (state: AuthType) => state.user;
export const chatsLength = (state: ChatType) => state.chats.length;
export default useChat;

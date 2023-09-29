import { create } from "zustand";
import { produce } from "immer";

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
  id: string;
}

export interface ChatType {
  chats: ChatMessageType[];
  chatHistory: string[];
  addChat: (chat: ChatMessageType, index?: number) => void;
  editChatMessage: (chat: string, updateIndex: number) => void;
  addNewChat: () => void;
  saveChats: () => void;
  viewSelectedChat: (chatId: string) => void;
  resetChatAt: (index: number) => void;
}

export interface UserType {
  name: string;
  email: string;
  avatar: string;
}

export interface AuthType {
  token: string;
  apikey: string;
  setToken: (token: string) => void;
  setUSer: (user: { name: string; email: string; avatar: string }) => void;
  setApiKey: (apikey: string) => void;
  user: UserType;
}

const useChat = create<ChatType>((set, get) => ({
  chats: [],
  chatHistory: localStorage.getItem("chatHistory")
    ? JSON.parse(localStorage.getItem("chatHistory") as string)
    : [],
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
    if(get().chats.length === 0) return;
    get().saveChats();
    set(
      produce((state: ChatType) => {
        state.chats = [];
      })
    );
  },

  saveChats: () => {
    const chat_id = get().chats[0].id;
    const data = {
      id: chat_id,
      createdAt: new Date().toISOString(),
      chats: get().chats,
      title: get().chats[0].content,
    };

    localStorage.setItem(chat_id, JSON.stringify(data));
    if (get().chatHistory.includes(chat_id)) return;
    localStorage.setItem(
      "chatHistory",
      JSON.stringify([...get().chatHistory, chat_id])
    );
    set(
      produce((state: ChatType) => {
        state.chatHistory.push(chat_id);
      })
    );
  },
  viewSelectedChat: (chatId) => {
    set(
      produce((state: ChatType) => {
        if (!localStorage.getItem(chatId)) return;
        state.chats = JSON.parse(localStorage.getItem(chatId) ?? "")?.chats ?? [];
      })
    );
  },
  resetChatAt: (index) => {
    set(
      produce((state: ChatType) => {
        state.chats[index].content = "";
      })
    );
  },
}));

const useAuth = create<AuthType>((set) => ({
  token: localStorage.getItem("token") || "",
  apikey: localStorage.getItem("apikey") || "",
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
  setApiKey: (apikey: string) => {
    set(
      produce((state) => {
        state.apikey = apikey;
      })
    );
  },
}));

export const selectChatsHistory = (state: ChatType) =>
  state.chatHistory.map((chat_id) => {
    const { title, id } = JSON.parse(localStorage.getItem(chat_id) as string);
    return { title, id };
  });
export const selectUser = (state: AuthType) => state.user;
export const chatsLength = (state: ChatType) => state.chats.length > 0;
export default useChat;

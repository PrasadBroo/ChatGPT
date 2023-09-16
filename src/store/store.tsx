import { create } from "zustand";
import { produce } from "immer";

export interface ChatMessageType {
  role: string;
  content: string;
}

export interface ChatType {
  chats: string[];
  addChat: (chat: string) => void;
}

const useChat = create<ChatType>((set) => ({
  chats: [],
  addChat: (chat: string) => {
    set(
      produce((state) => {
        state.chats.push(chat);
      })
    );
  },
}));

export const selectChatsIds = (state: ChatType) => state.chats;
export default useChat;

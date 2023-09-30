import { create } from "zustand";
import { produce } from "immer";

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
  id: string;
}
export interface SettingsType {
  settings: {
    sendChatHistory: boolean;
  };
  isModalVisible: boolean;
  setSendChatHistory: (value: boolean) => void;
  setModalVisible: (value: boolean) => void;
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
  handleDeleteChats: (chatid: string) => void;
  editChatsTitle: (id: string, title: string) => void;
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
    if (get().chats.length === 0) return;
    get().saveChats();
    set(
      produce((state: ChatType) => {
        state.chats = [];
      })
    );
  },

  saveChats: () => {
    let chat_id = get().chats[0].id;
    let title;
    if (localStorage.getItem(chat_id)) {
      const data = JSON.parse(localStorage.getItem(chat_id) ?? "");
      if (data.isTitleEdited) {
        title = data.title;
      }
    }
    const data = {
      id: chat_id,
      createdAt: new Date().toISOString(),
      chats: get().chats,
      title: title ? title : get().chats[0].content,
      isTitleEdited: Boolean(title),
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
        state.chats =
          JSON.parse(localStorage.getItem(chatId) ?? "")?.chats ?? [];
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
  handleDeleteChats: (chatid) => {
    set(
      produce((state: ChatType) => {
        state.chatHistory = state.chatHistory.filter((id) => id !== chatid);
        state.chats = [];
        localStorage.removeItem(chatid);
        localStorage.setItem("chatHistory", JSON.stringify(state.chatHistory));
      })
    );
  },
  editChatsTitle: (id, title) => {
    set(
      produce((state: ChatType) => {
        const chat = JSON.parse(localStorage.getItem(id) ?? "");
        chat.title = title;
        chat.isTitleEdited = true;
        localStorage.setItem(id, JSON.stringify(chat));
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
    localStorage.setItem("apikey", apikey);
  },
}));

const useSettings = create<SettingsType>((set) => ({
  settings: {
    sendChatHistory: false,
  },
  isModalVisible: false,
  setSendChatHistory: (value: boolean) => {
    set(
      produce((state) => {
        state.settings.sendChatHistory = value;
      })
    );
  },
  setModalVisible: (value: boolean) => {
    set(
      produce((state) => {
        state.isModalVisible = value;
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
export const isChatSelected = (id: string) => (state: ChatType) =>
  state.chats[0]?.id === id;

export default useChat;
export { useAuth, useSettings };

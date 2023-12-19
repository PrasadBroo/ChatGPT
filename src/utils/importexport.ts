import useChat, {
  ChatMessageType,
  useSettings,
  useTheme,
} from "../store/store";

type Backup = {
  conversations: {
    [key: string]: {
      id: string;
      created_at: string;
      updated_at: string;
      chats: [ChatMessageType];
    };
  };
  settings: {
    [key: string]: string | boolean | number;
  };
};

export function handleExportChats(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const backup: Backup = {
        conversations: {},
        settings: {},
      };
      useChat
        .getState()
        .chatHistory.forEach(
          (c) =>
            (backup.conversations[c] = JSON.parse(
              localStorage.getItem(c) as string
            ))
        );
      const settingsClone = JSON.parse(
        JSON.stringify(useSettings.getState().settings)
      );
      delete settingsClone.modalsList;
      backup.settings = settingsClone;
      backup.settings.theme = useTheme.getState().theme;

      const data = JSON.stringify(backup, null, 2);

      const a = document.createElement("a");
      const file = new Blob([data], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = `backup-${new Date().toISOString()}.json`;
      a.click();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

export function handleImportChats(file: File): Promise<Error | boolean> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function (e) {
        const chats = JSON.parse(e.target?.result as string);

        useChat.setState({ chatHistory: Object.keys(chats.conversations) });
        useTheme.setState({ theme: chats.settings.theme });
        useSettings.setState((prev) => ({
          settings: { ...prev.settings, ...chats.settings },
        }));

        Object.keys(chats.conversations).forEach((c) => {
          localStorage.setItem(c, JSON.stringify(chats.conversations[c]));
        });
        localStorage.setItem(
          "chatHistory",
          JSON.stringify(Object.keys(chats.conversations))
        );
        resolve(true);
      };
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
}

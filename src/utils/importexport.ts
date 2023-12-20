import useChat, {
  ChatMessageType,
  SettingsType,
  Theme,
  useSettings,
  useTheme,
} from "../store/store";

type Backup = {
  conversations: {
    [key: string]: {
      id: string;
      createdAt: string;
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
      const settingsClone:SettingsType['settings'] = JSON.parse(
        JSON.stringify(useSettings.getState().settings)
      );
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
      console.log(error);
      reject("Error exporting chats");
    }
  });
}

export function handleImportChats(file: File): Promise<Error | boolean> {
  if (!file) return Promise.reject(new Error("No file selected"));
  if (file.type !== "application/json")
    return Promise.reject(new Error("File is not a json file"));
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      const getOnlyUniqueIds = (arr: string[]) => Array.from(new Set(arr));
      reader.onload = function (e) {
        let chats: Backup;
        try {
          chats = JSON.parse(e.target?.result as string);
        } catch (error) {
          return reject("Invalid json file");
        }

        // only store chats that are not in the chatHistory

        useChat.setState((prev) => ({
          chatHistory: getOnlyUniqueIds(
            Object.keys(chats.conversations).concat(prev.chatHistory)
          ),
        }));
        useTheme.setState({ theme: chats.settings.theme as Theme });
        useSettings.setState((prev) => ({
          settings: { ...prev.settings, ...chats.settings },
        }));

        Object.keys(chats.conversations).forEach((c) => {
          localStorage.setItem(c, JSON.stringify(chats.conversations[c]));
        });
        localStorage.setItem(
          "chatHistory",
          JSON.stringify(
            getOnlyUniqueIds(
              Object.keys(chats.conversations).concat(
                useChat.getState().chatHistory
              )
            )
          )
        );
        resolve(true);
      };
      reader.readAsText(file);
    } catch (error) {
      if (error instanceof Error) reject(error.message);
    }
  });
}

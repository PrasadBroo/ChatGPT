import axios from "axios";
import { ChatMessageType } from "../store/store";

const apiKey = "sk-#######################################"; // Replace with your actual API key
const apiUrl = "https://api.openai.com/v1/chat/completions";

const message = 'write welcome page for a website called "My Portfolio"';

export const config = {
  method: "POST",
  url: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  data: {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    stream: false,
    messages: [
      {
        role: "system",
        content: "You are a code writer",
      },
      {
        role: "user",
        content: message,
      },
    ],
  },
};

export function gptConfig(message: string, messages?: ChatMessageType[]) {
  return {
    method: "POST",
    url: apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      stream: false,
      messages,
    },
  };
}

export function fetchResults(
  onData: (chunk: any) => void,
  onError: (error: Error) => void,
  onComplete: () => void
) {
  const axiosStream = axios(config);
  axiosStream
    .then((response) => {
      console.log(response.data);
      response.data.on("data", (chunk: any) => {
        let p = chunk.toString();
        p = JSON.parse(p.replace("data: ", ""));
        onData(p.choices[0].delta.content);
      });

      response.data.on("end", onComplete);
    })
    .catch(onError);
}

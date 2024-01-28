import shortid from "shortid";
import { ChatMessageType } from "../store/store";

export function createMessage(
  role: ChatMessageType["role"],
  query: string,
  type: ChatMessageType["type"]
): ChatMessageType {
  return {
    role,
    content: query,
    id: shortid.generate(),
    type,
  };
}

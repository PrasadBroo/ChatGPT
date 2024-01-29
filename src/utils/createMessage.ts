import shortid from "shortid";
import { ChatMessageType } from "../store/store";

export function createMessage<T>(
  role: ChatMessageType["role"],
  query: T,
  type: ChatMessageType["type"]
): { role: ChatMessageType['role']; content: T; id: string; type: ChatMessageType['type'] } {
  return {
    role,
    content: query,
    id: shortid.generate(),
    type,
  };
}

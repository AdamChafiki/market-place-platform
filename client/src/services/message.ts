import api from "@/lib/axios";
import type { CreateMessagePayload, Message } from "@/types";

export async function createMessage(payload: CreateMessagePayload) {
  const response = await api.post("/messages", payload);
  return response.data;
}

export async function getMessagesForUser(): Promise<{ messages: Message[] }> {
  const response = await api.get("/messages");
  return response.data;
}

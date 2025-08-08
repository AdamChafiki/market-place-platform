interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
}

interface Announcement {
  id: string;
  name: string;
  description: string;
  location: string;
  phoneNumber: string;
  hidePhone: boolean;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface GetAnnouncementsResponse {
  announcements: Announcement[];
}

interface UpdateProfileInterface {
  username: string;
  email: string;
}

interface CreateMessagePayload {
  receiverId: string;
  content: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  sender: { id: string; username: string };
  receiver: { id: string; username: string };
}

export type {
  RegisterInterface,
  GetAnnouncementsResponse,
  UpdateProfileInterface,
  CreateMessagePayload,
  Message,
};

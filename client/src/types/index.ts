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

export type {
  RegisterInterface,
  GetAnnouncementsResponse,
  UpdateProfileInterface,
};

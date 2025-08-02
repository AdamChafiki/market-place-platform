export interface AnnouncementInterface {
  name: string;
  description: string;
  location: string;
  phoneNumber: string;
  price: number;
  hidePhone?: boolean;
  imageUrl?: string;
}

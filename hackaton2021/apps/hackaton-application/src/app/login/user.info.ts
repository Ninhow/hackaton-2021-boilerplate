export interface UserInfo {
  id?: string;
  userId: string;
  likes: number;
  tags: string[];
  friends: string[];
  stared: string[];
  city: string;
}

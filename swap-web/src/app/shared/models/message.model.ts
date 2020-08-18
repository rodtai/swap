export interface Message {
  id: string;
  user_id: string;
  date_posted: Date;
  body: Media[];
}

export interface Media {
  type: 'image' | 'text';
  content: string;
}

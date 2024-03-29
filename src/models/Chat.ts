export interface Conversation {
  members: string[];
  _id: string;
}

export interface Message {
  sender: string;
  conversationId: string;
  text: string;
  _id: string;
  createdAt: Date;
}

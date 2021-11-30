import { Dispatch } from 'redux';

import { Request } from '../../Request';

export const createConversation =
  (userId: string, receiverId?: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.post(`/chat/conversation/${userId}/${receiverId}`);
    callback(res);
  };

export const getConversations =
  (userId: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.get(`/chat/conversation/${userId}`);
    callback(res);
  };

export const getMessages =
  (conversationId: string, callback = (res: any) => {}) =>
  async () => {
    const res = await Request.get(`/chat/message/${conversationId}`);
    callback(res);
  };

export const sendMessage =
  (conversationId: string, senderId: string = 'Null', text: string, callback = (res: any) => {}) =>
  async () => {
    const res = await Request.post(`/chat/message/${conversationId}/${senderId}`, { text });
    callback(res);
  };

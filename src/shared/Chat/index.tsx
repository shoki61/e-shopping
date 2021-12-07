import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { debounce } from 'lodash';

import { Space, Clickable } from 'components';
import { palette } from 'palette';
import { store } from 'store';
import { Profile, Conversation, Message } from 'models';
import * as actions from 'store/actions';

import AdminPage from './AdminPage';
import UserPage from './UserPage';
import './style.css';

type Props = {
  profile: Profile;
};

const Chat: React.FC<Props> = ({ profile }: Props) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile>();
  const [selectedConversation, setSelectedConversation] = useState<any>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io('http://localhost:3030');

    socket.current.on('getMessage', ({ senderId, text }: any) => {
      setArrivalMessage({
        sender: senderId,
        text,
      });
    });

    socket.current.on('startTyping', () => setIsTyping(true));
    socket.current.on('endTyping', () => setIsTyping(false));
    store.dispatch(
      actions.getAllUsers((res) => {
        if (!res.error) {
          setUsers(res.data);
        }
      }),
    );
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', profile._id);
    socket.current.on('onlineUsers', (users: any) => setOnlineUsers(users.map((user: any) => user.userId)));
  }, [profile._id]);

  useEffect(() => {
    const adminId = users?.find((u: Profile) => u?.isAdmin)?._id;
    if (arrivalMessage) {
      if (profile?._id === adminId) {
        selectedConversation?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      } else {
        conversations[0].members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage, selectedConversation]);

  useEffect(() => {
    const adminId = users?.find((u: Profile) => u?.isAdmin)?._id;
    if (profile?._id) {
      if (adminId && profile?._id !== adminId) {
        store.dispatch(
          actions.createConversation(profile?._id, adminId, (res) => {
            setConversations([res.data]);
          }),
        );
      }
    }
    store.dispatch(
      actions.getConversations(profile?._id, (res) => {
        if (!res.error) {
          setConversations(res.data);
        }
      }),
    );
  }, [openChatBox]);

  const sendMessage = async (text: string, isAdmin?: boolean) => {
    if (text.length > 0) {
      const adminId = users?.find((u: Profile) => u?.isAdmin)?._id;
      socket.current.emit('sendMessage', {
        senderId: profile._id,
        receiverId: isAdmin ? selectedUser?._id : adminId,
        text,
      });
      store.dispatch(
        actions.sendMessage(isAdmin ? selectedConversation._id : conversations[0]._id, profile?._id, text, (res) => {
          setMessages((prev) => [...prev, res.data]);
        }),
      );
    }
  };

  const getMessages = (conversationId: string) => {
    store.dispatch(
      actions.getMessages(conversationId, (res) => {
        if (!res.error) {
          setMessages(res.data);
        }
      }),
    );
  };

  useEffect(() => {
    if (openChatBox && conversations.length > 0) {
      const adminId = users?.find((u: Profile) => u?.isAdmin)?._id;
      if (profile?._id !== adminId) {
        getMessages(conversations[0]?._id);
      }
    }
  }, [openChatBox, conversations, profile]);

  const selectUser = (conversation: Conversation, profile?: Profile) => {
    getMessages(conversation._id);
    setSelectedUser(profile);
    setSelectedConversation(conversation);
  };

  const endedTyping = debounce((isAdmin: boolean) => {
    const adminId = users.find((u) => u.isAdmin)?._id;
    socket.current.emit('endedTyping', { receiverId: isAdmin ? selectedUser?._id : adminId });
  }, 2000);

  const startTyping = (isAdmin: boolean) => {
    const adminId = users.find((u) => u.isAdmin)?._id;
    socket.current.emit('typing', { receiverId: isAdmin ? selectedUser?._id : adminId });
  };

  return (
    <Space
      v={'n'}
      h={'n'}
      style={{ backgroundColor: !openChatBox ? palette.m : '#eee' }}
      className={`Chat-Box ${!openChatBox ? 'Close-Chat-Box' : 'Open-Chat-Box'}`}
    >
      {openChatBox ? (
        <div className={'Chat-Items-Container'}>
          {profile?.isAdmin ? (
            <AdminPage
              isTyping={isTyping}
              onEndedTyping={() => endedTyping(true)}
              onStartTyping={() => startTyping(true)}
              messages={messages}
              sendMessage={sendMessage}
              selectedUser={selectedUser}
              conversations={conversations}
              onCloseChatBox={() => setOpenChatBox(false)}
              users={users}
              onlineUsers={onlineUsers}
              cleareMessages={() => setMessages([])}
              onSelectedUser={(c: Conversation, user?: Profile) => selectUser(c, user)}
            />
          ) : (
            <UserPage
              isTyping={isTyping}
              messages={messages}
              onEndedTyping={() => endedTyping(false)}
              onStartTyping={() => startTyping(false)}
              onCloseChatBox={() => setOpenChatBox(false)}
              sendMessage={sendMessage}
            />
          )}
        </div>
      ) : (
        <Clickable className={'Open-Chat-Button'} onClick={() => setOpenChatBox((prev) => !prev)}>
          <ModeCommentIcon style={{ color: palette.l }} />
        </Clickable>
      )}
    </Space>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(Chat);

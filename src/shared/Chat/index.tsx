import { Fragment, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import ReLoading from 'react-loading';

import { Space, P, Clickable, Horizontal } from 'components';
import { palette } from 'palette';
import { store } from 'store';
import { Profile, Conversation, Message } from 'models';
import * as actions from 'store/actions';

import User from './User';
import './style.css';

type Props = {
  profile: Profile;
};

const Chat: React.FC<Props> = ({ profile }: Props) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [showAdminChat, setShowAdminChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | undefined>();
  const [selectedConversation, setSelectedConversation] = useState<any>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef<any>();
  const scrollRef = useRef<any>();

  useEffect(() => {
    socket.current = io('http://localhost:3030');

    socket.current.on('getMessage', ({ senderId, text }: any) => {
      console.log(text);
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

  const sendMessage = async (isAdmin?: boolean) => {
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
      setText('');
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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
    setShowAdminChat(true);
  };

  let typing = false;
  let timeout: any;

  const timeoutFunction = (isAdmin?: boolean, adminId?: string) => {
    typing = false;
    socket.current.emit('endedTyping', { receiverId: isAdmin ? selectedUser?._id : adminId });
  };

  const onKeyDownNotEnter = (isAdmin: boolean) => {
    const adminId = users.find((u) => u.isAdmin)?._id;
    if (!typing) {
      typing = true;
      socket.current.emit('typing', { receiverId: isAdmin ? selectedUser?._id : adminId });
      timeout = setTimeout(() => timeoutFunction(isAdmin, adminId), 3000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 3000);
    }
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
            !showAdminChat ? (
              <div>
                <Space v={'s'} style={{ backgroundColor: palette.m }}>
                  <Horizontal align={'middle'} spread>
                    <P align={'center'} size={'l'} color={'l'}>
                      Users
                    </P>
                    <Clickable onClick={() => setOpenChatBox(false)}>
                      <CloseRoundedIcon style={{ color: palette.l }} />
                    </Clickable>
                  </Horizontal>
                </Space>
                <Space v={'s'} h={'s'}>
                  {conversations?.map((c: Conversation) => (
                    <Fragment key={`chat-user-${c._id}`}>
                      <User
                        profile={users.find((u) =>
                          c.members.find((m) => m !== users.find((user) => user.isAdmin)?._id && m === u._id),
                        )}
                        onlineUsers={onlineUsers}
                        onClick={(v?: Profile) => selectUser(c, v)}
                      />
                      <Space v={'n'} b={'xs'} />
                    </Fragment>
                  ))}
                </Space>
              </div>
            ) : (
              <>
                <Space v={'s'} className={'Header-Container'} style={{ backgroundColor: palette.m }}>
                  <Horizontal spread>
                    <Horizontal>
                      <Space
                        flex
                        v={'n'}
                        h={'n'}
                        align={'center'}
                        className={'Avatar-Container'}
                        style={{ backgroundColor: `${palette.l}20` }}
                      >
                        <PersonOutlineOutlinedIcon style={{ color: palette.l }} />
                      </Space>
                      <P bold color={'l'}>
                        {selectedUser?.name || 'User'}
                      </P>
                    </Horizontal>
                    <Clickable
                      onClick={() => {
                        setShowAdminChat(false);
                        setMessages([]);
                      }}
                    >
                      <CloseRoundedIcon style={{ color: palette.l }} />
                    </Clickable>
                  </Horizontal>
                </Space>
                <div id={'Messages-Container'}>
                  {messages.map((message: Message) => (
                    <div
                      ref={scrollRef}
                      style={{
                        justifyContent: message.sender !== profile?._id ? 'flex-start' : 'flex-end',
                      }}
                      className={'Message-Container'}
                      key={message._id}
                    >
                      <Space
                        className={'Message-Content-Container'}
                        v={'xs'}
                        h={'s'}
                        style={{
                          backgroundColor: message.sender !== profile._id ? '#fff' : palette.m,
                          maxWidth: '85%',
                        }}
                      >
                        <P style={{ fontWeight: 500 }} color={message.sender !== profile._id ? 'dg' : 'l'}>
                          {message.text}
                        </P>
                      </Space>
                    </div>
                  ))}
                  {isTyping && (
                    <div className={'Typing-Bubbles-Container'}>
                      <ReLoading type={'bubbles'} color={palette.dg} width={30} height={30} />
                    </div>
                  )}
                </div>
                <Space className={'Chat-Bar'}>
                  <Horizontal>
                    <textarea
                      className={'Chat-Input'}
                      placeholder={'how can we help you'}
                      value={text}
                      rows={1}
                      style={{ color: palette.dg }}
                      onChange={({ target: { value } }) => {
                        setText(value);
                        onKeyDownNotEnter(true);
                      }}
                    />
                    <Space v={'n'} h={'xs'} />
                    <Clickable onClick={() => sendMessage(true)}>
                      <SendRoundedIcon style={{ color: text.length > 0 ? palette.m : palette.lg }} />
                    </Clickable>
                  </Horizontal>
                </Space>
              </>
            )
          ) : (
            <>
              <Space v={'s'} className={'Header-Container'} style={{ backgroundColor: palette.m }}>
                <Horizontal spread>
                  <Horizontal>
                    <Space
                      flex
                      v={'n'}
                      h={'n'}
                      align={'center'}
                      className={'Avatar-Container'}
                      style={{ backgroundColor: `${palette.l}35` }}
                    >
                      <PersonOutlineOutlinedIcon style={{ color: palette.l }} />
                    </Space>
                    <P bold color={'l'}>
                      Admin
                    </P>
                  </Horizontal>
                  <Clickable onClick={() => setOpenChatBox((openChatBox) => !openChatBox)}>
                    <CloseRoundedIcon style={{ color: palette.l }} />
                  </Clickable>
                </Horizontal>
              </Space>
              <div id={'Messages-Container'}>
                {messages.map((message: Message) => (
                  <div
                    ref={scrollRef}
                    style={{
                      justifyContent: message.sender !== profile._id ? 'flex-start' : 'flex-end',
                    }}
                    className={'Message-Container'}
                    key={message._id}
                  >
                    <Space
                      className={'Message-Content-Container'}
                      v={'xs'}
                      h={'s'}
                      style={{
                        backgroundColor: message.sender !== profile._id ? '#fff' : palette.m,
                        maxWidth: '85%',
                      }}
                    >
                      <P style={{ fontWeight: 500 }} color={message.sender !== profile._id ? 'dg' : 'l'}>
                        {message.text}
                      </P>
                    </Space>
                  </div>
                ))}
                {isTyping && (
                  <div className={'Typing-Bubbles-Container'}>
                    <ReLoading type={'bubbles'} color={palette.dg} width={30} height={30} />
                  </div>
                )}
              </div>
              <Space className={'Chat-Bar'}>
                <Horizontal>
                  <textarea
                    className={'Chat-Input'}
                    placeholder={'how can we help you'}
                    value={text}
                    rows={1}
                    style={{ color: palette.dg }}
                    onChange={({ target: { value } }) => {
                      setText(value);
                      onKeyDownNotEnter(false);
                    }}
                  />
                  <Space v={'n'} h={'xs'} />
                  <Clickable onClick={sendMessage}>
                    <SendRoundedIcon style={{ color: text.length > 0 ? palette.m : palette.lg }} />
                  </Clickable>
                </Horizontal>
              </Space>
            </>
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

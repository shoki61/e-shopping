import { Fragment, useEffect, useState } from 'react';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { v4 as uuidv4 } from 'uuid';

import { Space, P, Clickable, Horizontal } from 'components';
import { palette } from 'palette';
import { store } from 'store';
import * as actions from '../../store/actions';
import User from './User';

import './style.css';
import { Profile, Conversation, Message } from 'models';

type Props = {
  profile: Profile;
  guestUserId: string;
};

// const socket = io('http://localhost:3080', { transports: ['websocket'] });
const Chat: React.FC<Props> = ({ profile, guestUserId }: Props) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    store.dispatch(
      actions.getConversations(profile?._id ?? guestUserId, (res) => {
        if (!res.error) {
          setConversations(res.data);
        }
      }),
    );
  }, [profile, openChatBox, guestUserId]);

  useEffect(() => {
    store.dispatch(
      actions.getAllUsers((res) => {
        if (!res.error) {
          setUsers(res.data);
        }
      }),
    );
  }, [profile]);

  useEffect(() => {
    const elem = document.getElementById('Messages-Container');
    if (elem) {
      elem.scrollTop = elem?.scrollHeight;
    }

    // socket.on('messageToClient', (message: Payload) => {
    //   receivedMessage(message);
    // });
  }, [openChatBox, messages]);

  const sendMessage = () => {
    const adminId = users?.find((u: Profile) => u?.isAdmin)?._id;
    if (profile._id !== adminId && !conversations) {
      store.dispatch(
        actions.createConversation(profile._id ?? guestUserId, adminId, (res) => {
          console.log(res);
        }),
      );
    }
    if (text.length > 0) {
      if (profile._id !== adminId) {
        store.dispatch(
          actions.sendMessage(conversations[0]._id, profile?._id ?? guestUserId, text, (res) => {
            console.log(res);
          }),
        );
      }
      setText('');
    }
  };

  useEffect(() => {
    if (openChatBox) {
      store.dispatch(
        actions.getMessages(conversations[0]._id, (res) => {
          if (!res.error) {
            setMessages(res.data);
            console.log(res.data);
          }
        }),
      );
    }
  }, [openChatBox, conversations]);

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
                {users?.map((u: any) => (
                  <Fragment key={`chat-user-${u._id}`}>
                    <User profile={u} onClick={() => {}} />
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
                      Admin
                    </P>
                  </Horizontal>
                  <Clickable onClick={() => setOpenChatBox((openChatBox) => !openChatBox)}>
                    <CloseRoundedIcon style={{ color: palette.l }} />
                  </Clickable>
                </Horizontal>
              </Space>
              <Space h={'s'} id={'Messages-Container'}>
                {messages.map((message: Message) => (
                  <Space
                    flex
                    style={{
                      justifyContent: message.sender !== profile._id ?? guestUserId ? 'flex-start' : 'flex-end',
                    }}
                    className={'Message-Container'}
                    key={message._id}
                    v={'xs'}
                    h={'xs'}
                  >
                    <Space
                      className={'Message-Content-Container'}
                      v={'xs'}
                      h={'s'}
                      style={{
                        backgroundColor: message._id !== profile._id ?? guestUserId ? '#fff' : palette.m,
                        maxWidth: '85%',
                      }}
                    >
                      <P style={{ fontWeight: 500 }} color={message._id !== profile._id ?? guestUserId ? 'dg' : 'l'}>
                        {message.text}
                      </P>
                    </Space>
                  </Space>
                ))}
              </Space>
              <Space className={'Chat-Bar'}>
                <Horizontal>
                  <textarea
                    className={'Chat-Input'}
                    placeholder={'how can we help you'}
                    value={text}
                    rows={1}
                    style={{ color: palette.dg }}
                    onChange={({ target: { value } }) => setText(value)}
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

const mapStateToProps = ({ user: { profile, guestUserId } }: any) => ({ profile, guestUserId });

export default connect(mapStateToProps)(Chat);

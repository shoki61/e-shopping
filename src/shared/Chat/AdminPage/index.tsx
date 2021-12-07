import { useState, Fragment, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import ReLoading from 'react-loading';

import { Space, Horizontal, Clickable, P } from 'components';
import { palette } from 'palette';
import { Conversation, Message, Profile } from 'models';

import User from '../User';

type ReduxProps = {
  profile: Profile;
};

type AdminPageProps = {
  onCloseChatBox: (v: boolean) => void;
  onSelectedUser: (c: Conversation, u?: Profile) => void;
  conversations: Conversation[];
  users: Profile[];
  onlineUsers: string[];
  selectedUser?: Profile;
  cleareMessages: () => void;
  messages: Message[];
  isTyping: boolean;
  sendMessage: (t: string, v: boolean) => void;
  onEndedTyping: () => void;
  onStartTyping: () => void;
};

type Props = ReduxProps & AdminPageProps;

const AdminPage: React.FC<Props> = ({
  profile,
  conversations,
  users,
  onlineUsers,
  selectedUser,
  messages,
  isTyping,
  onSelectedUser,
  sendMessage,
  cleareMessages,
  onCloseChatBox,
  onEndedTyping,
  onStartTyping,
}: Props) => {
  const [openChat, setOpenChat] = useState(false);
  const [text, setText] = useState('');
  const scrollRef = useRef<any>();
  console.log(users);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  return !openChat ? (
    <div>
      <Space v={'s'} style={{ backgroundColor: palette.m }}>
        <Horizontal align={'middle'} spread>
          <P align={'center'} size={'l'} color={'l'}>
            Users
          </P>
          <Clickable onClick={() => onCloseChatBox(false)}>
            <CloseRoundedIcon style={{ color: palette.l }} />
          </Clickable>
        </Horizontal>
      </Space>
      <Space v={'s'} h={'s'}>
        {conversations?.map((c: Conversation) => (
          <Fragment key={`chat-user-${c._id}`}>
            <User
              profile={users.find((user: Profile) => c.members.includes(user._id))}
              onlineUsers={onlineUsers}
              onClick={(v?: Profile) => {
                onSelectedUser(c, v);
                setOpenChat(true);
              }}
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
              setOpenChat(false);
              cleareMessages();
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
              onStartTyping();
              onEndedTyping();
            }}
          />
          <Space v={'n'} h={'xs'} />
          <Clickable
            onClick={() => {
              sendMessage(text, true);
              setText('');
            }}
          >
            <SendRoundedIcon style={{ color: text.length > 0 ? palette.m : palette.lg }} />
          </Clickable>
        </Horizontal>
      </Space>
    </>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(AdminPage);

import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import ReLoading from 'react-loading';

import { Space, Horizontal, P, Clickable } from 'components';
import { Message, Profile } from 'models';
import { palette } from 'palette';

type ReduxProps = {
  profile: Profile;
};

type UserPageProps = {
  onCloseChatBox: () => void;
  messages: Message[];
  isTyping: boolean;
  sendMessage: (t: string, v: boolean) => void;
  onEndedTyping: () => void;
  onStartTyping: () => void;
};

type Props = ReduxProps & UserPageProps;

const UserPage = ({
  onCloseChatBox,
  messages,
  profile,
  isTyping,
  sendMessage,
  onEndedTyping,
  onStartTyping,
}: Props) => {
  const scrollRef = useRef<any>();
  const [text, setText] = useState('');

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
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
          <Clickable onClick={onCloseChatBox}>
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
              onEndedTyping();
              onStartTyping();
            }}
          />
          <Space v={'n'} h={'xs'} />
          <Clickable
            onClick={() => {
              sendMessage(text, false);
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

export default connect(mapStateToProps)(UserPage);

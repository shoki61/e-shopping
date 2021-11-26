import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { v4 as uuidv4 } from 'uuid';

import { Space, P, Clickable, Horizontal } from 'components';
import { palette } from 'palette';

import './style.css';

interface Message {
  id: string;
  text: string;
}

interface Payload {
  id: string;
  text: string;
}

const userId = uuidv4();

const socket = io('http://localhost:3080', { transports: ['websocket'] });
const Chat = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const elem = document.getElementById('Messages-Container');
    if (elem) {
      elem.scrollTop = elem?.scrollHeight;
    }

    function receivedMessage(message: Payload) {
      const newMessage: Message = {
        id: message.id,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    }

    socket.on('messageToClient', (message: Payload) => {
      console.log(message);
      receivedMessage(message);
    });
    console.log(messages);
  }, [openChatBox, messages]);

  function sendMessage() {
    if (text.length > 0) {
      const message: Payload = {
        id: userId,
        text,
      };

      socket.emit('messageToServer', message);
      setText('');
    }
  }

  return (
    <Space
      v={'n'}
      h={'n'}
      style={{ backgroundColor: !openChatBox ? palette.m : '#eee' }}
      className={`Chat-Box ${!openChatBox ? 'Close-Chat-Box' : 'Open-Chat-Box'}`}
    >
      {openChatBox ? (
        <div className={'Chat-Items-Container'}>
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
                style={{ justifyContent: message.id !== userId ? 'flex-start' : 'flex-end' }}
                className={'Message-Container'}
                key={message.id}
                v={'xs'}
                h={'xs'}
              >
                <Space
                  className={'Message-Content-Container'}
                  v={'xs'}
                  h={'s'}
                  style={{ backgroundColor: message.id !== userId ? '#fff' : palette.m, maxWidth: '85%' }}
                >
                  <P style={{ fontWeight: 500 }} color={message.id !== userId ? 'dg' : 'l'}>
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
        </div>
      ) : (
        <Clickable className={'Open-Chat-Button'} onClick={() => setOpenChatBox((openChatBox) => !openChatBox)}>
          <ModeCommentIcon style={{ color: palette.l }} />
        </Clickable>
      )}
    </Space>
  );
};

export default Chat;

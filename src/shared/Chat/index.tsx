import { useEffect, useState } from 'react';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { Space, P, Clickable, Input, Horizontal } from 'components';
import { palette } from 'palette';

import './style.css';

const dummyMessages = [
  { id: '111', message: 'Selam, sana nasıl yardımcı olabiriz', date: new Date().toLocaleDateString() },
  { id: '222', message: 'Selam', date: new Date().toLocaleDateString() },
  { id: '222', message: 'Hesabıma giriş yapamıyorum', date: new Date().toLocaleDateString() },
  { id: '111', message: 'Şifrenizi yenilemeyi denediniz mi?', date: new Date().toLocaleDateString() },
  { id: '222', message: 'Yok hemen deneyeceğim', date: new Date().toLocaleDateString() },
  {
    id: '111',
    message: 'Tamam, eğer hala sorun yaşamaya devam ederseniz lütfen bizimle iletişime geçin.',
    date: new Date().toLocaleDateString(),
  },
  { id: '222', message: 'Tamam, Teşekkürler', date: new Date().toLocaleDateString() },
  { id: '111', message: 'Teşekkürler', date: new Date().toLocaleDateString() },
  {
    id: '222',
    message: 'Şifremi sıfırlayamıyorum, doğrulama kodu mailime gelmiyor',
    date: new Date().toLocaleDateString(),
  },
  { id: '111', message: 'Mailinizi yazabilimisiniz hemen kontrol edelim', date: new Date().toLocaleDateString() },
  { id: '222', message: 'example@gmail.com', date: new Date().toLocaleDateString() },
  { id: '111', message: 'Bekleyin hemen kontrol ediyoruz.', date: new Date().toLocaleDateString() },
];

const Chat = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const elem = document.getElementById('Messages-Container');
    if (elem) {
      elem.scrollTop = elem?.scrollHeight;
    }
  }, [openChatBox]);
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
            {dummyMessages.map((item) => (
              <Space
                flex
                style={{ justifyContent: item.id === '111' ? 'flex-start' : 'flex-end' }}
                className={'Message-Container'}
                key={item.id}
                v={'xs'}
                h={'xs'}
              >
                <Space
                  className={'Message-Content-Container'}
                  v={'xs'}
                  h={'s'}
                  style={{ backgroundColor: item.id === '111' ? '#fff' : palette.m, maxWidth: '85%' }}
                >
                  <P style={{ fontWeight: 500 }} color={item.id === '111' ? 'dg' : 'l'}>
                    {item.message}
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
                value={message}
                rows={1}
                style={{ color: palette.dg }}
                onChange={({ target: { value } }) => setMessage(value)}
              />
              <Space v={'n'} h={'xs'} />
              <Clickable onClick={() => {}}>
                <SendRoundedIcon style={{ color: palette.m }} />
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

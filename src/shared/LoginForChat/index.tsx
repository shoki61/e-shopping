import { useState } from 'react';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useNavigate } from 'react-router-dom';

import { Space, P, Clickable, Image, Button } from 'components';
import { palette } from 'palette';
import './style.css';
import { fontSize } from 'fontSizes';
import { Bat } from 'assets';

const LoginForChat = () => {
  const [openLoginForChatBox, setOpenLoginForChat] = useState(false);
  const navigate = useNavigate();
  return (
    <Space
      v={'n'}
      h={'n'}
      style={{ backgroundColor: !openLoginForChatBox ? palette.m : '#eee' }}
      className={`Login-For-Chat-Box ${!openLoginForChatBox ? 'Close-Login-For-Chat-Box' : 'Open-Login-For-Chat-Box'}`}
    >
      {openLoginForChatBox ? (
        <>
          <Clickable className={'Login-For-Chat-Box-Close'} onClick={() => setOpenLoginForChat(false)}>
            <CloseRoundedIcon style={{ color: palette.dg, fontSize: fontSize.xxl }} />
          </Clickable>
          <div className={'Line'} />
          <Image source={Bat} className={'Bat-Image'} />

          <Space flex align={'center'} className={'Login-For-Chat-Button-Description'}>
            <P color={'dg'} align={'center'}>
              Canlı desteği kullanabilmen için önce giriş yapman lazım
            </P>
            <Space v={'s'} />
            <Button
              onClick={() => {
                navigate('/login');
                setOpenLoginForChat(false);
              }}
              title={'Login'}
            />
          </Space>
        </>
      ) : (
        <Clickable className={'Login-For-Chat-Button'} onClick={() => setOpenLoginForChat(true)}>
          <ModeCommentIcon style={{ color: palette.l }} />
        </Clickable>
      )}
    </Space>
  );
};

export default LoginForChat;

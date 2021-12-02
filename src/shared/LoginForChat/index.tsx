import { useState } from 'react';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

import { Space, P, Clickable } from 'components';
import { palette } from 'palette';

const LoginForChat = () => {
  const [openLoginForChatBox, setOpenLoginForChat] = useState(false);
  return (
    <Space
      v={'n'}
      h={'n'}
      style={{ backgroundColor: !openLoginForChatBox ? palette.m : '#eee' }}
      className={`Login-For-Chat-Box ${!openLoginForChatBox ? 'Close-Login-For-Chat-Box' : 'Open-Login-For-Chat-Box'}`}
    >
      <Clickable className={'Login-For-Chat-Button'} onClick={() => setOpenLoginForChat(true)}>
        <ModeCommentIcon style={{ color: palette.l }} />
      </Clickable>
    </Space>
  );
};

export default LoginForChat;

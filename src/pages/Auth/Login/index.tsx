import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Space, Button, Image, Input, P, Clickable } from 'components';
import { w } from 'windowDimensions';
import { palette } from 'palette';

import './style.css';

type Props = {};

const Login = ({}: Props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfoHandler = (key: string) => (value: string) => setUserInfo({ ...userInfo, [key]: value });

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P size={'xl'} color={'m'}>
          Hello welcome back
        </P>
      </Space>
      <Space style={{ width: w(25) }} className={'Login-Inputs-Container'}>
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={'E-mail'}
          value={userInfo.email}
          placeholder={'example@gmail.com'}
          onChange={userInfoHandler('email')}
          type={'email'}
        />
        <Space v={'s'} />
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={'Password'}
          value={userInfo.password}
          placeholder={'enter your password'}
          onChange={userInfoHandler('password')}
          secret
        />
        <Space h={'n'} v={'n'} t={'s'} b={'m'} flex style={{ justifyContent: 'flex-end' }}>
          <Clickable onClick={() => {}}>
            <P color={'dg'} size={'s'} bold>
              Forgot your password?
            </P>
          </Clickable>
        </Space>
        <Button
          title={'Login'}
          type={'submit'}
          color={'l'}
          borderRadius={100}
          fullWidth
          align={'center'}
          loading={loading}
          onClick={() => setLoading(!loading)}
        />
        <Space h={'n'} v={'s'} flex column align={'center'}>
          <P color={'dg'} align={'center'}>
            Don't you have an account?
          </P>
          <Clickable onClick={() => navigate('/sign-up')}>
            <P color={'i'} bold>
              Sign In
            </P>
          </Clickable>
        </Space>
      </Space>
    </Space>
  );
};

export default Login;

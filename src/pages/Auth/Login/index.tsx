import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Space, Button, Input, P, Clickable, T } from 'components';
import { w } from 'windowDimensions';
import { palette } from 'palette';
import { translate } from 'util/translate';

import './style.css';

type ReduxProps = {
  app: any;
};

type LoginProps = unknown;

type Props = ReduxProps & LoginProps;

const user = { email: 'test@gmail.com', password: '12345678' };
const emailRgx = /^\S+@\S+\.\S+$/;

const Login = (props: Props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userInfoHandler = (key: string) => (value: string) =>
    setUserInfo({ ...userInfo, [key]: value.replace(/\s/g, '') });

  const login = () => {
    if (!userInfo.email) return setError('email boş olamaz');
    if (!user.password) return setError('şifre boş olamaz');
  };
  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P size={'xl'} color={'m'}>
          <T>loginPageTitle</T>
        </P>
      </Space>
      <Space style={{ width: w(25) }} className={'Login-Inputs-Container'}>
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('email')}
          value={userInfo.email}
          placeholder={'example@gmail.com'}
          onChange={userInfoHandler('email')}
          type={'email'}
        />
        <Space v={'s'} />
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('password')}
          value={userInfo.password}
          placeholder={translate('enterYourPassword')}
          onChange={userInfoHandler('password')}
          secret
        />
        <Space h={'n'} v={'n'} t={'s'} b={'m'} flex style={{ justifyContent: 'flex-end' }}>
          <Clickable onClick={() => navigate('/reset-password')}>
            <P color={'dg'} size={'s'} bold>
              <T>forgotYourPassword</T>
            </P>
          </Clickable>
        </Space>
        <Button
          title={translate('login')}
          color={'l'}
          borderRadius={100}
          fullWidth
          align={'center'}
          loading={loading}
          onClick={login}
          enabled={emailRgx.test(userInfo.email) && userInfo.password.length > 8}
        />
        <Space h={'n'} v={'s'} flex column align={'center'}>
          <P color={'dg'} align={'center'}>
            <T>notAccount</T>
          </P>
          <Clickable onClick={() => navigate('/sign-up')}>
            <P color={'i'} bold>
              <T>signUp</T>
            </P>
          </Clickable>
        </Space>
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app }: any) => ({ app });

export default connect(mapStateToProps)(Login);

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Space, Button, Input, P, Clickable, T, AppNotification } from 'components';
import { palette } from 'palette';
import { translate } from 'util/translate';
import { store } from 'store';
import * as actions from 'store/actions';

import './style.css';

type ReduxProps = {
  app: any;
};

type LoginProps = unknown;

type Props = ReduxProps & LoginProps;

const Login = (props: Props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });
  const navigate = useNavigate();

  const userInfoHandler = (key: string) => (value: string) => {
    setErrors({ ...errors, [`${key}Error`]: '' });
    setUserInfo({ ...userInfo, [key]: value.replace(/\s/g, '') });
  };

  const login = () => {
    const { email, password } = userInfo;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setErrors({ ...errors, emailError: translate('emailError') });
    if (!password) return setErrors({ ...errors, passwordError: translate('passwordError') });
    setLoading(true);
    store.dispatch(
      actions.login(email, password, (res) => {
        setLoading(false);
        if (res.error) {
          return AppNotification.error(res.error);
        }
        store.dispatch(actions.loginSuccess(res.data));
        navigate('/');
      }),
    );
  };

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P size={'xl'} color={'m'}>
          <T>loginPageTitle</T>
        </P>
      </Space>
      <Space className={'Login-Inputs-Container'}>
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('email')}
          value={userInfo.email}
          placeholder={translate('emailPlaceholder')}
          onChange={userInfoHandler('email')}
          type={'email'}
          errorMessage={errors.emailError}
          error={errors.emailError.length > 0}
        />
        <Space v={'s'} />
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('password')}
          value={userInfo.password}
          placeholder={translate('passwordPlaceholder')}
          onChange={userInfoHandler('password')}
          secret
          errorMessage={errors.passwordError}
          error={errors.passwordError.length > 0}
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

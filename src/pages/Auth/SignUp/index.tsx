import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input, Button, P, T, Space, Clickable } from 'components';
import { translate } from 'util/translate';
import { palette } from 'palette';
import { w } from 'windowDimensions';

import './style.css';

type Props = {};

const SignUp: React.FC<Props> = (props: Props) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userInfoHandler = (key: string) => (value: string) => setUserInfo({ ...userInfo, [key]: value });

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P size={'xl'} color={'m'}>
          <T>signUpPageTitle</T>
        </P>
      </Space>
      <Space style={{ width: w(25) }} className={'Sign-Up-Inputs-Container'}>
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('username')}
          value={userInfo.name}
          placeholder={translate('usernameInputPlaceholder')}
          onChange={userInfoHandler('name')}
        />
        <Space v={'s'} />
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
          placeholder={translate('enterPassword')}
          onChange={userInfoHandler('password')}
          secret
        />
        <Space v={'s'} />
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('confirmPassword')}
          value={userInfo.confirmPassword}
          placeholder={translate('enterConfirmPassword')}
          onChange={userInfoHandler('confirmPassword')}
          secret
        />
        <Space v={'s'} />
        <Button
          title={translate('signUp')}
          color={'l'}
          borderRadius={100}
          fullWidth
          align={'center'}
          loading={loading}
          onClick={() => setLoading(!loading)}
        />
        <Space h={'n'} v={'s'} flex column align={'center'}>
          <P color={'dg'} align={'center'}>
            <T>accountAvailable</T>
          </P>
          <Clickable onClick={() => navigate('/login')}>
            <P color={'i'} bold>
              <T>login</T>
            </P>
          </Clickable>
        </Space>
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app }: any) => ({ app });

export default connect(mapStateToProps)(SignUp);

import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input, Button, P, T, Space, Clickable, AppNotification } from 'components';
import { translate } from 'util/translate';
import { palette } from 'palette';

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
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const navigate = useNavigate();

  const userInfoHandler = (key: string) => (value: string) => {
    setErrors({ ...errors, [`${key}Error`]: '' });
    setUserInfo({ ...userInfo, [key]: value });
  };

  const signUp = () => {
    const { name, email, password, confirmPassword } = userInfo;

    if (name.length < 2) return setErrors({ ...errors, nameError: translate('usernameError') });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setErrors({ ...errors, emailError: translate('emailError') });
    if (!password) return setErrors({ ...errors, passwordError: translate('passwordError') });
    if (password.length < 8) return setErrors({ ...errors, passwordError: translate('passwordMinError') });
    if (!confirmPassword || confirmPassword !== password)
      return setErrors({ ...errors, confirmPasswordError: translate('confirmPasswordError') });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      AppNotification.success('Wolcome!');
    }, 3000);
  };

  const inputs = [
    {
      title: translate('username'),
      value: userInfo.name,
      placeholder: translate('usernameInputPlaceholder'),
      onChange: userInfoHandler('name'),
      error: errors.nameError?.length > 0,
      errorMessage: errors.nameError,
    },
    {
      title: translate('email'),
      value: userInfo.email,
      placeholder: 'example@gmail.com',
      onChange: userInfoHandler('email'),
      error: errors.emailError.length > 0,
      errorMessage: errors.emailError,
    },
    {
      title: translate('password'),
      value: userInfo.password,
      placeholder: translate('passwordPlaceholder'),
      onChange: userInfoHandler('password'),
      secret: true,
      error: errors.passwordError.length > 0,
      errorMessage: errors.passwordError,
    },
    {
      title: translate('confirmPassword'),
      value: userInfo.confirmPassword,
      placeholder: translate('confirmPasswordPlaceholder'),
      onChange: userInfoHandler('confirmPassword'),
      secret: true,
      error: errors.confirmPasswordError?.length > 0,
      errorMessage: errors.confirmPasswordError,
    },
  ];

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P size={'xl'} color={'m'}>
          <T>signUpPageTitle</T>
        </P>
      </Space>
      <Space className={'Sign-Up-Inputs-Container'}>
        {inputs.map(({ title, value, placeholder, onChange, secret, error, errorMessage }, i) => (
          <Fragment key={`sign-up-inputs-${i}`}>
            <Input
              style={{ backgroundColor: `${palette.lg}15` }}
              titleColor={'dg'}
              title={title}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              secret={secret}
              error={error}
              errorMessage={errorMessage}
            />
            <Space v={'s'} />
          </Fragment>
        ))}

        <Button
          title={translate('signUp')}
          color={'l'}
          borderRadius={100}
          fullWidth
          align={'center'}
          loading={loading}
          onClick={signUp}
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

import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input, Button, P, T, Space, Clickable, AppNotification } from 'components';
import { translate } from 'util/translate';
import { palette } from 'palette';
import { store } from 'store';
import * as actions from 'store/actions';

import { VerificationCode } from '../components';
import './style.css';

type Props = {};

const SignUp: React.FC<Props> = (props: Props) => {
  const [steps, setSteps] = useState({ userInformation: true, verificationCode: false });
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    verificationCodeError: '',
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
    store.dispatch(
      actions.signUp({ ...userInfo }, (res) => {
        setLoading(false);
        if (res.error) {
          AppNotification.error(res.error);
        } else {
          setSteps({ userInformation: false, verificationCode: true });
          AppNotification.success('Verification code sent to your email');
        }
      }),
    );
  };

  const verify = () => {
    setLoading(true);
    store.dispatch(
      actions.verifyEmail(userInfo.email, verificationCode, (res) => {
        setLoading(false);
        if (res.error) {
          AppNotification.error('Verification code is wrong');
        } else {
          AppNotification.success('Your account has been created successfully');
        }
      }),
    );
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
      placeholder: translate('emailPlaceholder'),
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
        <P size={'xl'} align={'center'} color={'m'}>
          <T>signUpPageTitle</T>
        </P>
        {steps.verificationCode && (
          <P align={'center'} color={'dg'}>
            Please enter the verification code from your e-mail. (may be in spam :))
          </P>
        )}
      </Space>

      <Space className={'Sign-Up-Inputs-Container'}>
        {steps.userInformation ? (
          <>
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
          </>
        ) : (
          <>
            <VerificationCode
              loading={loading}
              onNext={verify}
              onBack={() => setSteps({ userInformation: true, verificationCode: false })}
              value={verificationCode}
              onChange={setVerificationCode}
              errorMessage={errors.verificationCodeError}
            />
          </>
        )}
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app }: any) => ({ app });

export default connect(mapStateToProps)(SignUp);

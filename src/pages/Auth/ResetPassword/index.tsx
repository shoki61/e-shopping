import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { Space, P, T } from 'components';
import { translate } from 'util/translate';

import './style.css';
import EmailVerify from './EmailVerify';
import VerificationCode from './VerificationCode';
import NewPassword from './NewPassword';

type ReduxProps = {
  languages: any;
};

type ResetPasswordProps = unknown;

type Props = ReduxProps & ResetPasswordProps;

const ResetPassword: React.FC<Props> = ({}: Props) => {
  const [steps, setSteps] = useState({
    emailVerify: true,
    verificationCode: false,
    newPassword: false,
  });

  const [inputsValue, setInputsValue] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: '',
    verificationCodeError: '',
    newPasswordError: '',
    confirmPasswordError: '',
  });
  const [currentPage, setCurrentPage] = useState('emailVerify');

  const navigate = useNavigate();

  const inputsValueHandler = (key: string) => (value: string) => {
    setErrors({ ...errors, [`${key}Error`]: '' });
    setInputsValue({ ...inputsValue, [key]: value });
  };

  const controlEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(inputsValue.email)) {
      return setErrors({ ...errors, emailError: translate('emailError') });
    }
    setLoading(true);
    setCurrentPage('verificationCode');
    setSteps({ ...steps, emailVerify: false, verificationCode: true });
  };

  const controlVerificationCode = () => {
    if (inputsValue.verificationCode.length < 6) {
      return setErrors({ ...errors, verificationCodeError: translate('verificationCodeError') });
    }
    setLoading(true);
    setCurrentPage('newPassword');
    setSteps({ ...steps, verificationCode: false, newPassword: true });
  };

  const controlPasswords = () => {
    const { newPassword, confirmPassword } = inputsValue;
    if (!newPassword) {
      return setErrors({ ...errors, newPasswordError: translate('passwordError') });
    }
    if (newPassword.length < 8) return setErrors({ ...errors, newPasswordError: translate('passwordMinError') });
    if (newPassword !== confirmPassword)
      return setErrors({ ...errors, confirmPasswordError: translate('confirmPasswordError') });
    setLoading(true);
    finish();
  };

  const finish = () => {};

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P align={'center'} size={'xl'} color={'m'}>
          <T>resetPasswordPageTitle</T>
        </P>
        <Space v={'xs'} style={{ width: 450 }}>
          <P color={'dg'} align={'center'}>
            <T>
              {steps.emailVerify
                ? 'resetPasswordPageInfo'
                : steps.verificationCode
                ? 'enterVerificationCodeMessage'
                : 'newPasswordMessage'}
            </T>
          </P>
        </Space>
      </Space>
      <Space className={'Reset-Inputs-Container'}>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={currentPage}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            classNames={'fade'}
          >
            <div>
              {steps.emailVerify && (
                <div className={'Step-Item'}>
                  <EmailVerify
                    value={inputsValue.email}
                    onChange={inputsValueHandler('email')}
                    errorMessage={errors.emailError}
                    onNext={controlEmail}
                    onBack={() => navigate('/login')}
                    loading={loading}
                  />
                </div>
              )}
              {steps.verificationCode && (
                <div className={'Step-Item'}>
                  <VerificationCode
                    value={inputsValue.verificationCode}
                    onChange={inputsValueHandler('verificationCode')}
                    errorMessage={errors.verificationCodeError}
                    onNext={controlVerificationCode}
                    onBack={() => {
                      setSteps({ ...steps, verificationCode: false, emailVerify: true });
                      setCurrentPage('emailVerify');
                    }}
                    loading={loading}
                  />
                </div>
              )}
              {steps.newPassword && (
                <div className={'Step-Item'}>
                  <NewPassword
                    newPassword={inputsValue.newPassword}
                    confirmPassword={inputsValue.confirmPassword}
                    onChangeNewPassword={inputsValueHandler('newPassword')}
                    onChangeConfirmPassword={inputsValueHandler('confirmPassword')}
                    onNext={controlPasswords}
                    onBack={() => {
                      setSteps({ ...steps, newPassword: false, verificationCode: true });
                      setCurrentPage('verificationCode');
                    }}
                    newPasswordError={errors.newPasswordError}
                    confirmPasswordError={errors.confirmPasswordError}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app: { languages } }: any) => ({ languages });

export default connect(mapStateToProps)(ResetPassword);

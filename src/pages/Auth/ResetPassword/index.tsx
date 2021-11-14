import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import { Space, P, T, Input, Button, AppNotification } from 'components';
import { translate } from 'util/translate';
import { palette } from 'palette';

import './style.css';

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

  const navigate = useNavigate();

  const inputsValueHandler = (key: string) => (value: string) => {
    setErrors({ ...errors, [`${key}Error`]: '' });
    setInputsValue({ ...inputsValue, [key]: value });
  };

  const onNext = (inactiveKey: string, activeKey: string) =>
    setSteps({ ...steps, [inactiveKey]: false, [activeKey]: true });

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
        {steps.emailVerify && (
          <>
            <Input
              style={{ height: 35, backgroundColor: `${palette.lg}15` }}
              titleColor={'dg'}
              title={translate('email')}
              value={inputsValue.email}
              placeholder={'example@gmail.com'}
              onChange={inputsValueHandler('email')}
              type={'email'}
              error={errors.emailError.length > 0}
              errorMessage={errors.emailError}
            />
            <Space v={'s'} />
            <Button
              title={translate('continue')}
              color={'l'}
              borderRadius={100}
              fullWidth
              align={'center'}
              loading={loading}
              onClick={() => onNext('emailVerify', 'verificationCode')}
            />
            <Space v={'s'} />
            <Button
              title={translate('back')}
              fullWidth
              align={'center'}
              borderRadius={100}
              type={'back'}
              onClick={() => navigate('/login')}
            />
          </>
        )}
        {steps.verificationCode && (
          <>
            <VerificationInput
              value={inputsValue.verificationCode}
              autoFocus
              onChange={inputsValueHandler('verificationCode')}
              classNames={{
                character: 'Verification-Character',
                characterInactive: 'character--inactive',
                characterSelected: 'character--selected',
              }}
            />
            <Space v={'s'} />
            <Button
              title={translate('continue')}
              color={'l'}
              borderRadius={100}
              fullWidth
              align={'center'}
              loading={loading}
              onClick={() => onNext('verificationCode', 'newPassword')}
            />
            <Space v={'s'} />
            <Button
              title={translate('back')}
              fullWidth
              align={'center'}
              borderRadius={100}
              type={'back'}
              onClick={() => onNext('verificationCode', 'emailVerify')}
            />
          </>
        )}
        {steps.newPassword && (
          <>
            <Input
              style={{ height: 35, backgroundColor: `${palette.lg}15` }}
              titleColor={'dg'}
              title={translate('newPassword')}
              value={inputsValue.newPassword}
              placeholder={translate('newPasswordPlaceholder')}
              onChange={inputsValueHandler('newPassword')}
              type={'password'}
              secret
              error={errors.newPasswordError.length > 0}
              errorMessage={errors.newPasswordError}
            />
            <Space v={'s'} />
            <Input
              style={{ height: 35, backgroundColor: `${palette.lg}15` }}
              titleColor={'dg'}
              title={translate('confirmPassword')}
              value={inputsValue.confirmPassword}
              placeholder={translate('confirmPasswordPlaceholder')}
              onChange={inputsValueHandler('confirmPassword')}
              type={'password'}
              secret
              error={errors.confirmPasswordError.length > 0}
              errorMessage={errors.confirmPasswordError}
            />
            <Space v={'s'} />
            <Button
              title={translate('submit')}
              color={'l'}
              borderRadius={100}
              fullWidth
              align={'center'}
              loading={loading}
              onClick={finish}
            />
            <Space v={'s'} />
            <Button
              title={translate('back')}
              fullWidth
              align={'center'}
              borderRadius={100}
              type={'back'}
              onClick={() => onNext('newPassword', 'verificationCode')}
            />
          </>
        )}
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app: { languages } }: any) => ({ languages });

export default connect(mapStateToProps)(ResetPassword);

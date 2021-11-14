import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Space, P, T, Input, Button, AppNotification } from 'components';
import { translate } from 'util/translate';
import { palette } from 'palette';
import { w } from 'windowDimensions';

import './style.css';

type ReduxProps = {
  languages: any;
};

type ResetPassword = unknown;

type Props = ReduxProps & ResetPassword;

const ResetPassword: React.FC<Props> = ({}: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const userEmailHandler = (value: string) => {
    setError('');
    setEmail(value);
  };

  const submit = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setError(translate('emailError'));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      AppNotification.success(translate('sendVerificationCode'));
    }, 3000);
  };

  return (
    <Space column align={'center'} flex>
      <Space v={'s'}>
        <P align={'center'} size={'xl'} color={'m'}>
          <T>resetPasswordPageTitle</T>
        </P>
        <Space v={'xs'} style={{ width: 450 }}>
          <P color={'dg'} align={'center'}>
            <T>resetPasswordPageInfo</T>
          </P>
        </Space>
      </Space>
      <Space className={'Reset-Inputs-Container'}>
        <Input
          style={{ height: 35, backgroundColor: `${palette.lg}15` }}
          titleColor={'dg'}
          title={translate('email')}
          value={email}
          placeholder={'example@gmail.com'}
          onChange={userEmailHandler}
          type={'email'}
          error={error.length > 0}
          errorMessage={error}
        />
        <Space v={'m'} />
        <Button
          title={translate('continue')}
          color={'l'}
          borderRadius={100}
          fullWidth
          align={'center'}
          loading={loading}
          onClick={submit}
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
      </Space>
    </Space>
  );
};

const mapStateToProps = ({ app: { languages } }: any) => ({ languages });

export default connect(mapStateToProps)(ResetPassword);

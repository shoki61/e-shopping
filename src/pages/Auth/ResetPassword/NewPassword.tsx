import { Button, Space, Input } from 'components';
import { translate } from 'util/translate';

type Props = {
  newPassword: string;
  newPasswordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  onChangeNewPassword: (v: string) => void;
  onChangeConfirmPassword: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
};

const NewPassword = ({
  newPassword,
  newPasswordError,
  onChangeNewPassword,
  confirmPassword,
  confirmPasswordError,
  onChangeConfirmPassword,
  onNext,
  onBack,
  loading,
}: Props) => {
  return (
    <>
      <Input
        value={newPassword}
        onChange={onChangeNewPassword}
        title={translate('password')}
        placeholder={translate('passwordPlaceholder')}
        error={newPasswordError.length > 0}
        secret
      />
      <Space v={'s'} />
      <Input
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        title={translate('confirmPassword')}
        placeholder={translate('confirmPasswordPlaceholder')}
        error={confirmPasswordError.length > 0}
        secret
      />
      <Space v={'s'} />
      <Button
        title={translate('continue')}
        borderRadius={100}
        loading={loading}
        fullWidth
        onClick={onNext}
        color={'l'}
      />
      <Space v={'s'} />
      <Button title={translate('back')} borderRadius={100} fullWidth onClick={onBack} type={'back'} />
    </>
  );
};

export default NewPassword;

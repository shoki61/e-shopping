import { Button, Space, Input } from 'components';
import { translate } from 'util/translate';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  errorMessage: string;
  onBack: () => void;
  loading: boolean;
};

const EmailVerify = ({ value, onChange, onNext, onBack, errorMessage, loading }: Props) => {
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        title={translate('email')}
        placeholder={translate('emailPlaceholder')}
        error={errorMessage.length > 0}
        errorMessage={errorMessage}
      />
      <Space v={'s'} />
      <Button
        title={translate('continue')}
        loading={loading}
        borderRadius={100}
        fullWidth
        onClick={onNext}
        color={'l'}
      />
      <Space v={'s'} />
      <Button title={translate('back')} fullWidth onClick={onBack} borderRadius={100} type={'back'} />
    </>
  );
};

export default EmailVerify;

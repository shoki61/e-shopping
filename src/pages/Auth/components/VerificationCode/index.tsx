import VerificationInput from 'react-verification-input';

import { Button, Space, P } from 'components';
import { translate } from 'util/translate';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  errorMessage: string;
  onBack: () => void;
  loading: boolean;
};

const VerificationCode = ({ value, onChange, onNext, onBack, errorMessage, loading }: Props) => {
  return (
    <>
      <VerificationInput
        autoFocus
        value={value}
        onChange={(value) => onChange(value.toUpperCase())}
        classNames={{
          character: 'Verification-Character',
          characterInactive: 'character--inactive',
          characterSelected: 'character--selected',
        }}
      />
      <P color={'e'} size={'xs'}>
        {errorMessage}
      </P>
      <Space v={'s'} />
      <Button title={translate('continue')} borderRadius={100} loading={loading} fullWidth onClick={onNext} />
      <Space v={'s'} />
      <Button title={translate('back')} borderRadius={100} fullWidth onClick={onBack} type={'back'} />
    </>
  );
};

export default VerificationCode;

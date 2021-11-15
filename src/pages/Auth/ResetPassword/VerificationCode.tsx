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
        onChange={onChange}
        classNames={{
          character: 'Verification-Character',
          characterInactive: 'character--inactive',
          characterSelected: 'character--selected',
        }}
      />
      <P color={'e'} size={'s'}>
        {errorMessage}
      </P>
      <Space v={'s'} />
      <Button title={translate('continue')} loading={loading} fullWidth onClick={onNext} color={'l'} />
      <Space v={'s'} />
      <Button title={translate('back')} fullWidth onClick={onBack} type={'back'} />
    </>
  );
};

export default VerificationCode;

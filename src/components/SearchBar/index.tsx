import Search from '@material-ui/icons/Search';

import { Horizontal, Clickable } from 'components';
import { palette } from 'palette';
import { fontSize } from 'fontSizes';

import './style.css';

type Props = {
  value: string;
  onChange: (v: string) => any;
  placeholder?: string;
  style?: React.CSSProperties;
};

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }: Props) => {
  return (
    <div className={'Search-Bar-Container'} style={{ borderColor: palette.lg }}>
      <Horizontal align={'middle'}>
        <input
          className={'Search-Bar-Input'}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          placeholder={placeholder}
          style={{ fontSize: fontSize.l, color: palette.m }}
        />
        <Clickable onClick={() => {}}>
          <Search style={{ color: palette.dg }} />
        </Clickable>
      </Horizontal>
    </div>
  );
};

export default SearchBar;

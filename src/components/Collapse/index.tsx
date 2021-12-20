import { useState } from 'react';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';

import Space from '../Space';
import P from '../P';
import Clickable from '../Clickable';
import Horizontal from '../Horizontal';

import './style.css';
import { palette, PaletteKey } from 'palette';

type Props = {
  title: string;
  titleColor?: PaletteKey;
  contents: React.ReactNode;
  icon?: React.ReactElement;
};

const Collapse: React.FC<Props> = ({ title, contents, icon, titleColor }: Props) => {
  const [showContent, setShowContent] = useState(false);
  const iconProps = { style: { color: palette.m } };
  return (
    <Space v={'s'} h={'s'}>
      <Clickable onClick={() => setShowContent(!showContent)}>
        <Horizontal style={{ borderColor: palette.lg }} spread className={'Collapse-Title-Container'}>
          <P color={titleColor ?? 'dg'} bold>
            {title}
          </P>
          {showContent ? <KeyboardArrowUpRounded {...iconProps} /> : <KeyboardArrowDownRounded {...iconProps} />}
        </Horizontal>
      </Clickable>
      <div style={{ maxHeight: showContent ? 250 : 0 }} className={'Collapse-Contents-Container'}>
        {contents}
      </div>
    </Space>
  );
};

export default Collapse;

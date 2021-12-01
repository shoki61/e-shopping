import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { palette } from 'palette';

import { Space, P, Clickable, Horizontal } from 'components';
import './style.css';
import { Profile } from 'models';

type ReduxProps = {};

type UserProps = {
  profile?: Profile;
  onClick: (v?: Profile) => void;
};

type Props = ReduxProps & UserProps;

const User: React.FC<Props> = ({ profile, onClick }: Props) => {
  return (
    <Clickable onClick={() => onClick(profile)} className={'User-Container'} style={{ backgroundColor: palette.l }}>
      <Space v={'s'}>
        <Horizontal>
          <Space flex align={'center'} v={'n'} h={'n'} className={'User-Avatar'} style={{ backgroundColor: palette.m }}>
            <PersonOutlineOutlinedIcon style={{ color: palette.l }} />
            <div className={'User-Active'} style={{ backgroundColor: false ? 'limegreen' : '#9c9c9c' }} />
          </Space>
          <Space v={'n'} h={'s'}>
            <P color={'dg'}>{profile?.name || 'Misafir Kullanıcı'}</P>
          </Space>
        </Horizontal>
      </Space>
    </Clickable>
  );
};

export default User;

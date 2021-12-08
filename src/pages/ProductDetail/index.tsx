import { connect } from 'react-redux';
import { Rating } from 'react-simple-star-rating';

import { Space, Clickable, P, Horizontal, Button, Sizes } from 'components';
import { Profile } from 'models';

type Props = {
  profile: Profile;
};

const ProductDetail: React.FC<Props> = ({ profile }: Props) => {
  return (
    <div>
      <Space>
        <Horizontal>
          <Space></Space>
          <Space>
            <P>Name</P>
            <P>Değerlendirme</P>
            <Rating readonly onClick={() => {}} ratingValue={4.5} allowHalfIcon />
            <P>Fiyat</P>
            <P>35 TL</P>
            <P>Size</P>
            <Sizes onClick={(v: string) => {}} />
          </Space>
        </Horizontal>
      </Space>
    </div>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(ProductDetail);

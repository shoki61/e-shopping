import { connect } from 'react-redux';
import { Rating } from 'react-simple-star-rating';

import { Space, Clickable, P, Horizontal, Button, Sizes, ProductColors } from 'components';
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
            <P color={'dg'} size={'xl'} bold>
              Siyah Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört.
            </P>
            <Space h={'n'} v={'xs'} />
            <P color={'dg1'} bold>
              Değerlendirme
            </P>
            <Horizontal>
              <Rating readonly onClick={() => {}} size={30} ratingValue={4.5} allowHalfIcon />
              <Space v={'n'} h={'xs'}>
                <P color={'dg1'}>(275)</P>
              </Space>
            </Horizontal>
            <Space h={'n'} v={'xs'} />
            <P color={'dg1'} bold>
              Fiyat
            </P>
            <P color={'dg'} size={'xxl'} bold>
              35 TL
            </P>
            <Space h={'n'} v={'xs'} />
            <Sizes onClick={(v: string) => {}} />
            <Space h={'n'} v={'s'} />
            <ProductColors
              onClick={(v: string) => {}}
              options={[
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty78/product/media/images/20210317/13/73036227/154236149/1/1_org_zoom.jpg',
                  color: 'red',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty77/product/media/images/20210303/20/68406319/148048713/0/0_org_zoom.jpg',
                  color: 'black',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty79/product/media/images/20210303/17/68373830/147952454/0/0_org_zoom.jpg',
                  color: 'white',
                },
              ]}
            />
            <Space h={'n'} v={'s'} />
            <Button title={'Sepete ekle'} onClick={() => {}} fontSize={'l'} />
            <Space h={'n'} v={'s'} />
            <P bold color={'dg1'}>
              Satıcı
            </P>
            <P style={{ fontWeight: 500 }} color={'i'}>
              Lorem ipsum
            </P>
            <Space h={'n'} v={'xs'} />
            <P bold color={'dg1'}>
              Ürün açıklaması
            </P>
            <P color={'dg'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel iaculis mauris, id viverra sem. Sed
              pellentesque eu lectus ut auctor. Praesent eget aliquam arcu. Etiam vitae porta nulla. Aenean euismod quis
              felis ac ornare. Vestibulum pharetra orci vel nibh interdum, ac pharetra nulla
            </P>
          </Space>
        </Horizontal>
      </Space>
    </div>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(ProductDetail);

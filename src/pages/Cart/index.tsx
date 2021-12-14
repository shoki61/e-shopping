import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AddRounded, RemoveRounded, DeleteOutlineRounded } from '@material-ui/icons';

import { Space, Horizontal, P, Clickable, Image, Button, Container, Checkbox } from 'components';
import { Profile } from 'models';
import { palette } from 'palette';
import { EmptyCart } from 'assets';
import './style.css';
import { w } from 'windowDimensions';

type Props = {
  profile: Profile;
};

const Cart: React.FC<Props> = ({ profile }: Props) => {
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  return (
    <Space v={'xxxl'} h={'xxxl'} flex column align={'flex-start'}>
      {false ? (
        <>
          <div
            className={'Cart-Empty-Cart-Container'}
            style={{
              backgroundColor: `${palette.m}60`,
            }}
          >
            <Image source={EmptyCart} width={65} height={65} />
          </div>
          <Space v={'s'}>
            <P color={'dg1'} bold>
              Sepetiniz boş!
            </P>
          </Space>
          <Button title={'Alışveriş yapmaya başla'} onClick={() => navigate('/')} />
        </>
      ) : (
        <Horizontal>
          <Space flex>
            <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
            <Space v={'n'} h={'s'} />
            <Container borderRadius={8} id={'Cart-Item-Container'}>
              <Horizontal style={{ width: w(50) }}>
                <Horizontal style={{ maxWidth: '80%' }} align={'top'}>
                  <Clickable onClick={() => navigate('/product-detail')}>
                    <Image
                      source={
                        'https://cdn.dsmcdn.com/mnresize/1200/1800/ty184/product/media/images/20210927/16/136847065/135399598/1/1_org_zoom.jpg'
                      }
                      width={100}
                    />
                  </Clickable>
                  <Space v={'xs'}>
                    <P bold color={'dg'}>
                      Siyah Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört.
                    </P>
                    <Space h={'n'} v={'xs'}>
                      <P color={'dg'} size={'s'}>
                        Renk: <strong>Siyah</strong>
                      </P>
                    </Space>
                    <P color={'dg'} size={'s'}>
                      Beden: <strong>M</strong>
                    </P>
                    <Space h={'n'} v={'xs'}>
                      <P bold size={'xl'} color={'m'}>
                        44,99TL
                      </P>
                    </Space>
                    <P color={'dg1'} bold size={'s'}>
                      {count} adet / 44,99 TL
                    </P>
                  </Space>
                </Horizontal>

                <Space flex style={{ flex: 1 }}>
                  <Horizontal>
                    <Clickable
                      onClick={() => count !== 1 && setCount(count - 1)}
                      className={'Cart-Item-Counter-Button'}
                    >
                      <RemoveRounded style={{ color: palette.dg1 }} />
                    </Clickable>
                    <Space v={'n'} h={'s'}>
                      <P bold color={'dg'} size={'l'}>
                        {count}
                      </P>
                    </Space>
                    <Clickable
                      onClick={() => setCount(count + 1)}
                      className={'Cart-Item-Counter-Button'}
                      style={{ backgroundColor: palette.m }}
                    >
                      <AddRounded style={{ color: palette.l }} />
                    </Clickable>
                  </Horizontal>
                </Space>
              </Horizontal>
              <Clickable
                style={{ backgroundColor: palette.l }}
                onClick={() => {}}
                htmlTitle={'Sepetten sil'}
                className={'Cart-Item-Delete-Button'}
              >
                <DeleteOutlineRounded style={{ color: palette.e }} />
              </Clickable>
            </Container>
          </Space>
          <Space />
        </Horizontal>
      )}
    </Space>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(Cart);

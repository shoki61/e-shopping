import React, { useState } from 'react';
import { connect } from 'react-redux';

import { palette } from 'palette';
import { Button, Space, P, Input, Clickable, Image } from 'components';
import { h, w } from 'windowDimensions';

type ReduxProps = unknown;

type HomeProps = unknown;

type Props = ReduxProps & HomeProps;

const Home: React.FC<Props> = () => {
  const [inputV, setInputV] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ width: w(100), height: h(100) }}>
      <Input title={'Password'} placeholder={'enter your passord'} value={inputV} onChange={setInputV} />
      <Clickable
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
      >
        <Image
          width={250}
          source={
            'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
          }
        />
      </Clickable>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);

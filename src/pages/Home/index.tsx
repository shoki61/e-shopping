import React, { useState } from 'react';
import { connect } from 'react-redux';

import { palette } from 'palette';
import { Button, Space, P, Input } from 'components';
import { h, w } from 'windowDimensions';

type ReduxProps = unknown;

type HomeProps = unknown;

type Props = ReduxProps & HomeProps;

const Home: React.FC<Props> = () => {
  const [inputV, setInputV] = useState('');
  return (
    <div style={{ width: w(100), height: h(100) }}>
      <Input title={'Password'} placeholder={'enter your passord'} value={inputV} onChange={setInputV} />
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);

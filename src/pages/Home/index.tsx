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
  return <div style={{ width: w(90), height: h(90) }}></div>;
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);

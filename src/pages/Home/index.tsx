import React from 'react';
import { connect } from 'react-redux';

import { palette } from 'palette';
import { Button, Space } from 'components';

type ReduxProps = unknown;

type HomeProps = unknown;

type Props = ReduxProps & HomeProps;

const Home: React.FC<Props> = () => {
  return <div></div>;
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);

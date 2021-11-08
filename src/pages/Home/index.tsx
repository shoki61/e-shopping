import React from 'react';
import { connect } from 'react-redux';

import { palette } from 'palette';
import { Button, Space, P } from 'components';
import { h, w } from 'windowDimensions';

type ReduxProps = unknown;

type HomeProps = unknown;

type Props = ReduxProps & HomeProps;

const Home: React.FC<Props> = () => {
  return (
    <div style={{ width: w(100), height: h(100) }}>
      <Button title="Selamlar" fontSize={'s'} color={'l'} />
      <Button title="Selamlar" fontSize={'m'} color={'l'} />
      <Button title="Selamlar" fontSize={'l'} color={'l'} />
      <Button title="Selamlar" fontSize={'xl'} color={'l'} />
      <Button title="Selamlar" fontSize={'xxl'} color={'l'} />
      <Button title="Selamlar" fontSize={'xxxl'} color={'l'} />
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);

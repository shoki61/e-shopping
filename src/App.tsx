import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Navigation from 'Navigation';
import { persistor, store } from 'store';
import * as actions from 'store/actions';

type Props = {
  profile: any;
};

const App = ({ profile }: Props) => {
  useEffect(() => {
    if (!profile?._id) {
      store.dispatch(actions.setGuestId(uuidv4()));
    }
  }, [profile]);
  return (
    <PersistGate persistor={persistor}>
      <Navigation />
    </PersistGate>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(App);

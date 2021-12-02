import { PersistGate } from 'redux-persist/integration/react';

import Navigation from 'Navigation';
import { persistor } from 'store';

const App = () => (
  <PersistGate persistor={persistor}>
    <Navigation />
  </PersistGate>
);

export default App;

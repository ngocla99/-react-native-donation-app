import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppState} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {checkToken} from './api/user';
import RootNavigation from './navigation/RootNavigation';
import store, {persistor} from './redux/store';

function App() {
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    AppState.addEventListener('change', async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('🐛 You have come back into the app');
        await checkToken();
        //we are coming from background to the foreground
      }

      appState.current = nextAppState;
    });
  }, []);

  React.useEffect(() => {
    const render = async () => {
      await checkToken();
      console.log('🐛 Application has rendered');
    };

    render();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

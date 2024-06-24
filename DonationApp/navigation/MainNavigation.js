import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  Login,
  Payment,
  Registration,
  SingleDonationItem,
} from '../screens';
import {Routes} from './Routes';

const Stack = createStackNavigator();

const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={Routes.Login}>
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Registration} component={Registration} />
    </Stack.Navigator>
  );
};

const Authenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={Routes.Home}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.Payment} component={Payment} />
      <Stack.Screen
        name={Routes.SingleDonationItem}
        component={SingleDonationItem}
      />
    </Stack.Navigator>
  );
};

export {Authenticated, NonAuthenticated};

import { createDrawerNavigator } from 'react-navigation';
import  PaymentsScreen  from '../../containers/Paymets';
import  IncomesScreen  from '../../containers/Income';
import  ProfileScreen  from '../../containers/Profile';
import  SettingsScreen  from '../../containers/Settings';
import  ChartsScreen  from '../../containers/Charts';

const AppNavigator = createDrawerNavigator({
  Home: { screen: ProfileScreen },
  PaymentsScreen: { screen: PaymentsScreen },
  IncomesScreen: { screen: IncomesScreen },
  ChartsScreen: { screen: ChartsScreen },
  SettingsScreen: { screen: SettingsScreen },
});

export default AppNavigator
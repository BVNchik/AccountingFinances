import { createDrawerNavigator } from 'react-navigation';
import  PaymentsScreen  from '../../components/Paymets';
import  IncomesScreen  from '../../components/Income';
import  ProfileScreen  from '../../components/Profile';
import  SettingsScreen  from '../../components/Settings';
import  ChartsScreen  from '../../components/Charts';

const AppNavigator = createDrawerNavigator({
  Home: { screen: ProfileScreen },
  PaymentsScreen: { screen: PaymentsScreen },
  IncomesScreen: { screen: IncomesScreen },
  ChartsScreen: { screen: ChartsScreen },
  SettingsScreen: { screen: SettingsScreen },
});

export default AppNavigator
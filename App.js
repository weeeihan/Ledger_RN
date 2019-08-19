//import all screen
import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';
import NewEntryScreen from './screens/NewEntryScreen';

import {createAppContainer,createStackNavigator} from 'react-navigation';


const MainNavigator = createStackNavigator(
  {
    Home : {screen: HomeScreen},
    Record : {screen: RecordScreen},
    AddNew : {screen: NewEntryScreen},
  },
  {
      initialRouteName: "Home"
  }
)

const App = createAppContainer(MainNavigator);

export default App;
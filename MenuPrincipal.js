import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import Home from './Home'
import MeusDados from './MeusDados'

const drawerNavigation = createDrawerNavigator({
    Home,
    MeusDados
    
});

export default createAppContainer(drawerNavigation);
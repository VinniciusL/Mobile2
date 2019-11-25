import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from "./src/screens/LoginScreen";
import MenuPrincipal from "./src/screens/MenuPrincipal";
import Cadastro from "./src/screens/Cadastro";
import DetalhesLivros from "./src/screens/DetalhesLivros";

const stackNavigator = createStackNavigator({
    LoginScreen : {
        screen: LoginScreen
    },
    MenuPrincipal: {
        screen: MenuPrincipal,
        navigationOptions: ({navigation}) => ({
          headerLeft: <Icon size={24} style={{marginLeft: 10}} name="menu" onPress={()=>navigation.toggleDrawer()}/>
        }),
      },
    Cadastro: {
        screen: Cadastro,
        navigationOptions: {
            headerTitle: 'Cadastro'
        }
    },
    DetalhesLivros: {
      screen: DetalhesLivros,
      navigationOptions: {
          headerTitle: 'Detalhes do Livro'
      }
  }
});

export default createAppContainer(stackNavigator);

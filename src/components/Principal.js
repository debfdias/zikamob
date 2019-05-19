import * as React from 'react';
import { View, StyleSheet, Button, Dimensions ,SafeAreaView,  InteractionManager} from 'react-native';
import { TabView, Text, TabBar, SceneMap } from 'react-native-tab-view';
import { modificaEmail , modificaSenha , autenticaUsuario} from '../actions/AutenticacaoActions'
import firebase from 'firebase'
import Dados from './Dados'
import Conversa from './Conversas'
import TabMenu  from './TabMenu'

const dados = Dados
const conversas = Conversa

export const logoutUser = () => {
  firebase.auth().signOut();
}

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Dados pessoais' },
      { key: 'second', title: 'Conversas' },
    ],
  };

  logout(navigation) {
    console.log('logout() called', navigation)
    logoutUser()

    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Auth')
    })
  }

  renderHeader = props => <TabMenu {...props}/>



  render() {
    return (
        <SafeAreaView style={{flex:1 , backgroundColor:"#000"}}>
            <TabView
                renderTabBar={this.renderHeader}
                navigationState={this.state}
                renderScene={SceneMap({
                first: dados,
                second: conversas,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
                
            />

            <Button onPress={() => this.logout(this.props.navigation)} title='Sair'/>

      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
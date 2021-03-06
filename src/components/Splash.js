import React, {Component} from 'react';
import{Actions} from 'react-native-router-flux'
import {View , TextInput , Button , StyleSheet, Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import { modificaEmail , modificaSenha} from '../actions/AutenticacaoActions'
import FormStyle from  '../styles/FormStyle'
import Theme from '../styles/Theme'

const initialize = () => {
  setTimeout(() => {
    Actions.replace("formLogin")
  }, 3000);
}

class Splash extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount(){
      initialize();
    }


    render() {
    console.log('Splash props ->',this.props)
    return (
      <SafeAreaView style={{flex:1 ,justifyContent:"center",alignItems: 'center',...Theme.view}}>
          <TouchableOpacity onPress={() => {Actions.replace("formLogin")}}>
            <Text style={{fontSize:40, ...Theme.text}}>ZikaMob</Text>
            <Text style={{fontSize:14, ...Theme.text}}>Um app legal</Text> 
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  // email: state.AutenticacaoReducer.email,
  // senha: state.AutenticacaoReducer.senha
});

export default connect(mapStateToProps,{ modificaEmail,modificaSenha } )(Splash);

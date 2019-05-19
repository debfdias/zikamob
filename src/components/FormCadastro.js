import React, {Component} from 'react';
import {View , TextInput , ScrollView, Text, Button ,SafeAreaView,ActivityIndicator} from 'react-native'
import { modificaSenha , modificaEscola, modificaEmail , modificaNome, modificaEndereco, modificaFone,cadastraUsuario} from '../actions/AutenticacaoActions'
import {connect} from 'react-redux'
import FormStyle from  '../styles/FormStyle'
import Theme from  '../styles/Theme'



class FormCadastro extends Component {


  cadastrar_usuario(){
    const nome = this.props.nome
    const email = this.props.email
    const senha = this.props.senha
    const escola = this.props.escola
    const endereco = this.props.endereco
    const fone = this.props.fone

    //nascimento, cpf, token, ccCelpe, pontos
    
    this.props.cadastraUsuario({email,senha,nome,escola, endereco, fone})
  }

  exibeBotaoCadastro(){
    if (!this.props.loaderCadastro){
      return ( <Button onPress={() => this.cadastrar_usuario()} title='Cadastrar'/>)
    }else{
      return ( <ActivityIndicator size="large"/> )
    }
  }

  constructor(props){
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{flex:1 ,justifyContent:"center",...Theme.view}}>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Text style={{fontSize:30 , fontWeight:"bold", fontFamily: 'Arial',...Theme.text}}>ZikaMob</Text>
          </View>
          <View style={{flex:5,padding:30}}>
              <TextInput  style={FormStyle.textInput} value={this.props.nome} onChangeText={texto => {this.props.modificaNome(texto)}} placeholder='Nome'/>
              <TextInput  style={FormStyle.textInput} value={this.props.escola}  onChangeText={texto => {this.props.modificaEscola(texto)}} placeholder='Escola'/>
              <TextInput  style={FormStyle.textInput} value={this.props.endereco}  onChangeText={texto => {this.props.modificaEndereco(texto)}} placeholder='Endereço'/>
              <TextInput  style={FormStyle.textInput} value={this.props.fone} onChangeText={texto => {this.props.modificaFone(texto)}} keyboardType={'numeric'} placeholder='Telefone/celular'/>
              <TextInput  style={FormStyle.textInput} value={this.props.email} onChangeText={texto => {this.props.modificaEmail(texto)}} placeholder='Email'/>
              <TextInput secureTextEntry style={FormStyle.textInput} value={this.props.senha} onChangeText={texto => {this.props.modificaSenha(texto)}} placeholder='Senha'/>      
              <Text style={FormStyle.errorMessage}>{this.props.erroCadastro}</Text>
          </View>
          <View>
            {this.exibeBotaoCadastro()}
          </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  nome:  state.AutenticacaoReducer.nome,
  escola:  state.AutenticacaoReducer.escola,
  endereco:  state.AutenticacaoReducer.endereco,
  fone:  state.AutenticacaoReducer.fone,
  erroCadastro: state.AutenticacaoReducer.erroCadastro,
  loaderCadastro: state.AutenticacaoReducer.loaderCadastro

});

export default connect(mapStateToProps , { modificaEmail,modificaSenha,modificaNome,modificaEscola,modificaEndereco,modificaFone,cadastraUsuario})(FormCadastro)

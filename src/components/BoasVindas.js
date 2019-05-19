import React , {Component} from 'react'
import { SafeAreaView,View,Text,Image , Button, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'


export default class BoasVindas extends Component {
    constructor(props){
        super(props)
    }

    state = { currentUser: null,
              estudante: []
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        var email = firebase.auth().currentUser.email

        firebase.database().ref('/estudantes/').orderByChild('email').equalTo('P@g.com').on('value', snapshot => {
            snapshot.forEach(userSnapshot => {
                let data = userSnapshot.val();
                console.log('data: ', data);
                let estudante = Object.values(data)
                this.setState({estudante});
            });
        })
    }



    render(){
        const { estudante } = this.state
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:2 , justifyContent:"center",alignItems: 'center',}}>
                    <Text style={{fontSize:25,padding:20}}>Seja Bem Vindo ao ZikaMob</Text>
                    <Text style={{fontSize:15}}>Seu Cadastro foi realizado com sucesso!</Text>
                    <Text>
                      Oi {estudante[4]}!
                     </Text>
                     <Text>
                      Email : {estudante[0]}
                     </Text>
                     <Text>
                      Endereco : {estudante[1]}
                     </Text>
                     <Text>
                      Escola : {estudante[2]}
                     </Text>
                     <Text>
                      Telefone : {estudante[3]}
                    </Text>
                </View>
                <View style={{flex:2 , alignItems: 'center'}}>
                    <Button onPress={()=>Actions.formLogin()} title="Acessar"></Button>
                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: '50%',
        flex: 1,
        alignItems: 'center'
    },
    skeleton: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    emptyEmail: {
        marginTop: 20,
        backgroundColor: '#dbd9d9',
        borderRadius: 10,
        width: 170,
        height: 20
    },
    button: {
        width: 200,
    }
});
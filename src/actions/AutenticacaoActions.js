import firebase from 'firebase'
import {
    Actions
} from 'react-native-router-flux';
import b64 from 'base-64'

import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    MODIFICA_ESCOLA,
    MODIFICA_ENDERECO,
    MODIFICA_FONE,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICA_USUARIO_SUCESSO,
    AUTENTICA_USUARIO_ERRO,
    ACTIVITY
} from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}
export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const modificaEscola = (texto) => {
    return {
        type: MODIFICA_ESCOLA,
        payload: texto
    }
}

export const modificaEndereco = (texto) => {
    return {
        type: MODIFICA_ENDERECO,
        payload: texto
    }
}

export const modificaFone = (texto) => {
    return {
        type: MODIFICA_FONE,
        payload: texto
    }
}

export const cadastraUsuario = (cadastro) => {
    return dispatch => {
        dispatch({type: ACTIVITY})

        firebase.auth().createUserWithEmailAndPassword(cadastro.email, cadastro.senha)
            .then(user => {
                firebase.database().ref(`/estudantes/`)
                    .set({
                        nome: cadastro.nome,
                        email: cadastro.email,
                        escola: cadastro.escola, 
                        endereco: cadastro.endereco,
                        fone: cadastro.fone
                    })
                    .then(value => {
                        cadastraUsuarioSucesso(dispatch)
                    })
            })
            .catch(error => cadastraUsuarioErro(error, dispatch));
    }
}

const cadastraUsuarioSucesso = (dispatch) => {
    //  dispatch ({type: 'cadastra_usuario',payload: {...cadastro}})
    dispatch({
        type: CADASTRO_USUARIO_SUCESSO
    })
    Actions.formLogin();
}

const cadastraUsuarioErro = (erro, dispatch) => {
    dispatch({
        type: CADASTRO_USUARIO_ERRO,
        payload: erro.message
    })
}


export const autenticaUsuario = (usuario) => {
    return dispatch => {
        
        dispatch({type: ACTIVITY})

        firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
            .then(user => {
                autenticaUsuarioSucesso(dispatch, user)
            })
            .catch(error => {
                autenticaUsuarioErro(dispatch, error)
            });
    }
}

const autenticaUsuarioSucesso = (dispatch, user) => {
    dispatch({
        type: AUTENTICA_USUARIO_SUCESSO
    })
    Actions.boasVindas();
}
const autenticaUsuarioErro = (dispatch, error) => {
    dispatch({
        type: AUTENTICA_USUARIO_ERRO,
        payload: error.message
    })
}
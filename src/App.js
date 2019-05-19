/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from "redux-thunk"

import Routes from "./Routes"
import reducers from  "./reducers"


export default class App extends Component {

  componentWillMount(){
     // Initialize Firebase
    var config =  {
      apiKey: 'AIzaSyD4Brzl82sMjhBmXrjC68Ift9rF9ubwP6s',
      authDomain: 'zikadev-a5089.firebaseapp.com',
      databaseURL: 'https://zikadev-a5089.firebaseio.com',
      projectId: 'zikadev-a5089',
      storageBucket: 'gs://zikadev-a5089.appspot.com',
      messagingSenderId: '788910832805'
    };
    firebase.initializeApp(config);
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <Routes/>
      </Provider>
    
    );
  }
}


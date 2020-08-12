import React from 'react'
import firebase from 'firebase'

export default class DB extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}
var config = {
    apiKey: "AIzaSyDUWWUaLbkO67bxnBfRTwMP_fhQ5vR-2OU",
    authDomain: "testproxumer.firebaseapp.com",
    databaseURL: "https://testproxumer.firebaseio.com",
    projectId: "testproxumer",
    storageBucket: "testproxumer.appspot.com",
    messagingSenderId: "524644798840",
    appId: "1:524644798840:web:99ea663f13fe4f9b1d388d",
    measurementId: "G-4MNTD74KTW"
};
firebase.initializeApp(config);

export var fb = firebase

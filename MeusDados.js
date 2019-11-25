import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            nome: ''
        }
        this.enviar = this.enviar.bind(this)
    }

    componentDidMount() {
        
    }

    enviar() {
        firestore().collection("nome").add({
            nome: this.state.nome
        })
        .then(()=>alert('Nome cadastrado com sucesso'))
        .catch(()=>alert('Erro ao cadastrar nome'))
            
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    value={this.props.navigation.getParam('phone','+55 ')}
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                     />

                <TextInput style={styles.inputBox}
                    onChangeText={(nome) => this.setState({ nome })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Nome"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    ref={(input) => this.nome = input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.enviar}>Enviar</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
import React, { Component } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const extractKey = ({ id }) => id

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livros: [],
            nomes: []
        }

        this.getLivros = this.getLivros.bind(this)
        this.getNomes = this.getNomes.bind(this)
    }

    componentDidMount() {
        this.getLivros()
    }

    getLivros() {
        firestore().collection("livros").get()
            .then((querySnapshot) => {
                let livros = []
                querySnapshot.forEach((doc) => {
                    livros.push({ id: doc.id, ...doc.data() })
                });
                this.setState({ livros: livros })
            })
    }

    getNomes() {
        firestore().collection("nome").get()
            .then((querySnapshot) => {
                let nomes = []
                querySnapshot.forEach((doc) => {
                    nomes.push({ id: doc.id, ...doc.data() })
                });
                this.setState({ nomes: nomes })
            })
    }


    renderItem = ({ item }) => {
        return (
            <View style={styles.row}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalhesLivros',{ item })}>

                <Text style={{}}> Titulo: {item.titulo} </Text>
                <Text> Autor: {item.autor}</Text>
                <Text> Telefone Doador: {this.props.navigation.getParam('phone','+55 ')} </Text>
                
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        return (

            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.getLivros()} />
               
                <FlatList
                    data={this.state.livros}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />

                <TouchableOpacity style={styles.button} 
                onPress={ () => this.props.navigation.navigate('Cadastro')}>

                <Text style={styles.buttonsignin}> + </Text>

                </TouchableOpacity>
            </View>
        );
    }
}

    
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#cce6ff',
        elevation: 4
    },
    button: {
        margin: 20,
        borderRadius: 50,
        height: 90,
        marginLeft: 300,
        backgroundColor: '#0066ff',
      },
    buttonsignin: {
        fontSize: 60,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
})
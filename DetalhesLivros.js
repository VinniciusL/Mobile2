import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';

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
                <Text style={{}}> Titulo: {item.titulo} </Text>
                <Text> Autor: {item.autor}</Text>
                <Text> Telefone Doador: {this.props.navigation.getParam('phone', '+55 ')} </Text>
            </View>
        )   
    }

    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.getParam(item)}>
                <Text>
                    data={this.state.livros}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                </Text>
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
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#cce6ff',
        elevation: 15,
        alignItems: 'center'
    }
})

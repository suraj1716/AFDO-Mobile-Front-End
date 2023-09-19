import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 40,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        margin:20,
        fontSize: 25,
    }
})

export default FormContainer;
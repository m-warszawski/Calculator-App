import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Item extends Component {
    constructor() {
        super();
        this.wypisz = this.wypisz.bind(this);
    }
    wypisz() {
        var aa = this.props.tekst
        this.props.wypisz(aa)
    }
    render() {
        return (
            <View style={this.props.buttony}>
                <TouchableOpacity style={[styles.klik, this.props.tlo]} onPress={this.wypisz}>
                    <Text style={{ color: "#fff", fontSize: 48 }}>{this.props.tekst}</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

export default Item;

const styles = StyleSheet.create({
    klik: {
        flex: 1,
        alignItems: 'center',   //w poziomie
        justifyContent: 'center',   //w pionie    
        width: "100%",
    },


});
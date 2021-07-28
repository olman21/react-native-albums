import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from 'react-native';

export class AlbumItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.cellContainer}>
                <Image source={{ uri: this.props.album.thumbnailUrl}} style={styles.thumbnail} />
                <Text>{this.props.album.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer:{
        paddingVertical: 10,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10
    },
    thumbnail:{
        width: 50,
        height: 50,
        marginEnd: 10
    }
   });
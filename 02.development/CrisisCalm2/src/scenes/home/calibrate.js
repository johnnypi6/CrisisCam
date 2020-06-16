import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';

export default class CalibrateScreen extends Component {
    constructor(props) {
        super(props);

        this.onBtnCalibrateTapped = this.onBtnCalibrateTapped.bind(this);
    }

    onBtnCalibrateTapped() {
        this.props.navigation.push("Chat", {calibrate: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={ Images.addTextBackground1 } style={styles.background} >
                    <View style = {styles.viewUpper}>
                        <TouchableOpacity onPress = { this.onBtnCalibrateTapped }>
                            <Text style = {styles.txtCalibrate}>Calibrate{"\n\n"}ADD TEXT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.viewLower}></View>
                </ImageBackground>
                <View style = {styles.viewFooter}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    viewUpper: {
        flex: 4,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    viewLower: {
        flex: 6,
    },
    viewFooter: {
        height: 50,
        backgroundColor: "white",
        borderTopColor: "#eee",
        borderTopWidth: 2
    },
    txtCalibrate: {
        fontSize: 21,
        lineHeight: 28
    },
});
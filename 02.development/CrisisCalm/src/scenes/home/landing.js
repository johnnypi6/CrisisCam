import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';

export default class LandingScreen extends Component {
    constructor(props) {
        super(props);

        this.onBtnLaunchTapped = this.onBtnLaunchTapped.bind(this);
        this.onBtnCalibrateTapped = this.onBtnCalibrateTapped.bind(this);
    }

    onBtnLaunchTapped() {
        this.props.navigation.push("Chat");
    }

    onBtnCalibrateTapped() {
        this.props.navigation.push("Calibrate");
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={ Images.introBackground } style={styles.background}>
                    <View style = {styles.viewUpper}></View>
                    <View style = {styles.viewLower}>
                        <View style = {styles.viewIntro}>
                            <Text style = {styles.txtIntro}>
                                Let's{"\n"} calm down
                            </Text>
                        </View>
                        <View style = {styles.viewButton}>
                            <TouchableOpacity style = {styles.wrapLaunch} onPress = { this.onBtnLaunchTapped }>
                                <View style = {styles.viewLaunch}>
                                    <Text style={styles.btnLaunch}>LAUNCH</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.wrapCalibrate} onPress = { this.onBtnCalibrateTapped }>
                                <Text style={styles.btnCalibrate}>CALIBRATE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        flex: 1
    },
    viewLower: {
        flex: 1,
    },
    viewFooter: {
        height: 50,
        backgroundColor: "white",
        borderTopColor: "#eee",
        borderTopWidth: 2
    },
    viewIntro: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    viewButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    txtIntro: {
        fontSize: 30,
        letterSpacing: 1.4,
        textAlign: "center",
        color: "#2E4484"
    },
    wrapLaunch: {
        width: 225,
        height: 50
    },
    viewLaunch: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 225,
        height: 50,
        backgroundColor: "#305CD2",
        borderRadius: 25,
        shadowColor: '#070707', // IOS
        shadowOffset: { width: -1, height: 1 }, // IOS
        shadowOpacity: 0.6, // IOS
        shadowRadius: 25, //IOS
        elevation: 4, // Android
    },
    btnLaunch: {
        fontSize: 15,
        color: "white",
        letterSpacing: 5,
    },
    wrapCalibrate: {
        marginTop: 16
    },
    btnCalibrate: {
        color: "#305CD2",
        letterSpacing: 5
    },
});
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';

export default class CalibrateScreen extends Component {
    constructor(props) {
        super(props);

        this.onBtnBeginTapped = this.onBtnBeginTapped.bind(this);
    }

    onBtnBeginTapped() {
        this.props.navigation.push("Chat", {calibrate: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={ Images.addTextBackground1 } style={styles.background} >
                    
                    <ScrollView>
                        <View style = {styles.viewUpper}>
                        </View>
                        <View style = {styles.viewLower}>
                            <Text style = {styles.txtCalibrate}>Calibrate</Text>
                            <Text style = {styles.txtDescription}>
                                Suffers of panic or anxiety attacks may benefit from calibrating CrisisCalm to their personal experience.
    During or leading up to a panic attack, your mind causes you to feel fear and stress to force you to flee the source of a perceived threat.  Your intelligence attempts to override that threat messaging, but when you can’t or won’t flee, the fear kicks in harder and stress keeps escalating until you lose control.  Once triggered, this one-track reaction is difficult to stop, even when there is no real or actual threat to your safety. 
    Intense stress or fear reactions can feel or manifest differently for different people.  You can personalise CrisisCalm by selecting three reaction descriptions which most closely match your own experience.
    Each time you use CrisisCalm, those reactions will be presented to you as the negative feelings to dispel.  
    You can recalibrate your chosen reactions at any time.
                            </Text>
                            <TouchableOpacity style = {styles.wrapLaunch} onPress = { this.onBtnBeginTapped }>
                                <View style = {styles.viewLaunch}>
                                    <Text style={styles.btnLaunch}>BEGIN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </ImageBackground>
                <View style = {styles.viewFooter}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
    },
    viewUpper: {
        height: 140
        // flex: 3,
    },
    viewLower: {
        // flex: 8,
        alignItems: "center"
    },
    viewFooter: {
        height: 50,
        backgroundColor: "white",
        borderTopColor: "#eee",
        borderTopWidth: 2
    },
    txtCalibrate: {
        fontSize: 21,
        lineHeight: 28,
    },
    txtDescription: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        textAlign: "center"
    },
    wrapLaunch: {
        marginTop: 20,
        marginBottom: 20,
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
});
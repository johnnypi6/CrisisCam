import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';

export default class WellDoneScreen extends Component {
    constructor(props) {
        super(props);

        this.onBtnLaunchTapped = this.onBtnBetterTapped.bind(this);
    }

    onBtnBetterTapped() {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={ Images.doneBackground } style={styles.background}>
                    <View style = {styles.viewUpper}>
                        <Text style = {styles.txtWellDone}>Well done,{"\n"}Mark</Text>
                        <Text style = {styles.txtDash}>—</Text>
                        <Text style = {styles.txtWellDoneDesc}>
                            You have achieved greater confidence and thus you can be more relaxed in this area of your life
                        </Text>
                    </View>
                    <View style = {styles.viewLower}>
                        <View style = {styles.viewButton}>
                            <TouchableOpacity style = {styles.wrapBetter} onPress = { this.onBtnBetterTapped }>
                                <View style = {styles.viewBetter}>
                                    <Text style={styles.btnBetter}>FEELING BETTER</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.wrapNotGreat}>
                                <Text style={styles.btnNotGreat}>STILL NOT GREAT</Text>
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
        flex: 4,
        alignItems: "center",
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40
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
    txtWellDone: {
        color: "#2E54C5",
        fontSize: 36,
        lineHeight: 44,
        textAlign: "center"
    },
    txtDash: {
        color: "#2E54C5",
        fontSize: 18
    },      
    txtWellDoneDesc: {
        color: "#4C4C4C",
        fontSize: 21,
        lineHeight: 28,
        textAlign: "center"
    },
    viewButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
    },
    wrapBetter: {
        width: 225,
        height: 50
    },
    viewBetter: {
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
    btnBetter: {
        fontSize: 15,
        color: "white",
        letterSpacing: 3,
    },
    wrapNotGreat: {
        marginTop: 16
    },
    btnNotGreat: {
        color: "#305CD2",
        letterSpacing: 3
    },
});
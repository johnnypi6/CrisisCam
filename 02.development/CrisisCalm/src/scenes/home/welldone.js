import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';
import shuffle from 'shuffle-array';

let messages = [
    "You have achieved greater confidence and thus you can be more relaxed in this area of your life",
    "You have become more willing to deal with events as they transpire, rather than being so constantly on guard and ‘preventional’ about what may come up",
    "You have become more oriented to the present, and will find it easier to percieve directly what is right or wrong in it, and thus act accordingly"
]

export default class WellDoneScreen extends Component {
    constructor(props) {
        super(props);
        
        this.onBtnBetterTapped = this.onBtnBetterTapped.bind(this);
        this.onBtnNotGreatTapped = this.onBtnNotGreatTapped.bind(this);
    }

    onBtnBetterTapped() {
        this.props.navigation.navigate("Landing");
    }

    onBtnNotGreatTapped() {
        this.props.navigation.navigate("Landing");
    }

    render() {
        messages = shuffle(messages);

        return (
            <View style={styles.container}>
                <ImageBackground source={ Images.doneBackground } style={styles.background}>
                    <View style = {styles.viewUpper}>
                        <Text style = {styles.txtWellDone}>Well done</Text>
                        <Text style = {styles.txtDash}>—</Text>
                        <Text style = {styles.txtWellDoneDesc}>
                            { messages[0] }
                        </Text>
                    </View>
                    <View style = {styles.viewLower}>
                        <View style = {styles.viewButton}>
                            <TouchableOpacity style = {styles.wrapBetter} onPress = { this.onBtnBetterTapped }>
                                <View style = {styles.viewBetter}>
                                    <Text style={styles.btnBetter}>FEELING BETTER</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.wrapNotGreat} onPress = { this.onBtnNotGreatTapped } >
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
        fontSize: 30,
        textAlign: "center"
    },
    txtDash: {
        color: "#2E54C5",
        fontSize: 12
    },      
    txtWellDoneDesc: {
        color: "#4C4C4C",
        fontSize: 18,
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
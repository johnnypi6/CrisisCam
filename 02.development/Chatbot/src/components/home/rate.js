import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import Slider from '@react-native-community/slider';

import { Images } from 'res';

export default class ReactionList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { answerData } = this.props;

        return (
            <View style = {styles.viewLower}>
                <View style = {styles.viewUp}>
                    <Text style = {styles.txtUp}>
                        I'm noticing what is OK in the current scene
                    </Text>
                </View>
                <View style = {styles.viewSlider}>
                    <Slider
                        style = {styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
                <View style = {styles.viewDown}>
                    <Text style = {styles.txtDown}>
                        Unable to relax even though I know I should
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewLower: {
        flex: 7,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 24,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 16
    },
    viewUp: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewSlider: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        transform: [ { rotate: "-90deg" } ]
    },
    viewDown: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    txtUp: {
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1.3
    },
    slider: {
        flex: 1
    },
    txtDown: {
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1.3
    }
});
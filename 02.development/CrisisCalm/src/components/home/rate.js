import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground
} from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Images } from 'res';

class CustomMarker extends Component {
    render() {
        return (
            <View style = {markerStyles.container}>
                <View style = {markerStyles.viewLeft}>
                    <View style = {markerStyles.outRectUp}>
                        <View style = {markerStyles.inRectUp}></View>
                    </View>
                    <View style = {markerStyles.outRectDown}>
                        <View style = {markerStyles.inRectDown}></View>
                    </View>
                </View>
                <View style = {markerStyles.viewRight}>
                    <Icon style = {markerStyles.triUp} name = "caret-up" color = "#979797"/>
                    <View style = {markerStyles.viewDrag}>
                        <Text style = {markerStyles.txtDrag}>drag</Text>
                    </View>
                    <Icon style = {markerStyles.triDown} name = "caret-down" color = "#979797"/>
                </View>
            </View>
        )
    }
}

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { value, disabled } = this.props;

        const screenHeight = Math.round(Dimensions.get('window').height);

        return (
            <View style = {styles.viewLower}>
                <ImageBackground style = {styles.background} source = {Images.rateBackground} >
                    <View style = {styles.viewUp}>
                        <Text style = {styles.txtUp}>
                            I'm noticing what is OK in the current scene
                        </Text>
                    </View>
                    <View style = {styles.viewSlider}>
                        <MultiSlider values = {[value]}
                            disabled = {disabled}
                            sliderLength = {screenHeight / 3.3}
                            vertical = {true}
                            imageBackgroundSource = {Images.sliderBackground}
                            containerStyle = {styles.slider}
                            trackStyle = {{height: 0}}
                            customMarker = {CustomMarker}
                            onValuesChangeFinish = { (values) => {
                                this.props.onValueChange(values[0]);
                             }}/>
                    </View>
                    <View style = {styles.viewDown}>
                        <Text style = {styles.txtDown}>
                            Unable to relax even though I know I should
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewLower: {
        flex: 7,
        flexDirection: "column",
    },
    background: {
        flex: 1,
        flexDirection: "column",
        resizeMode: "cover",
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
        justifyContent: "center",
        alignItems: "center",
    },
    viewDown: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    txtUp: {
        width: 225,
        fontSize: 15,
        color: "#00103D",
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1.3,
    },
    slider: {
        height: 40,
        shadowColor: '#8F8F8F', // IOS
        shadowOffset: { width: -4, height: 4 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 4, // Android
        backgroundColor: "#8F8F8F"
    },
    txtDown: {
        width: 225,
        fontSize: 15,
        color: "#FF3D2C",
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1.3
    }
});

const markerStyles = StyleSheet.create({
    container: {
        width: 40,
        height: 160,
        marginTop: 60,
        justifyContent: "space-between"
    },
    viewLeft: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 100,
        shadowColor: '#8F8F8F', // IOS
        shadowOffset: { width: -4, height: 4 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 4, // Android
        backgroundColor: "white",
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10
    },
    viewRight: {
        flexDirection: "column",
        alignItems: "center",
        height: 40,
        transform: [{rotate: '90deg'}]
    },
    outRectUp: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 40,
    },
    outRectDown: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 40
    },
    inRectUp: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        width: 4,
        shadowColor: '#979797', // IOS
        shadowOffset: { width: -4, height: 4 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 1, // Android
    },
    inRectDown: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        width: 4,
        shadowColor: '#979797', // IOS
        shadowOffset: { width: -4, height: 4 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 1, // Android
    },
    triUp: {
        flex: 1
    },
    viewDrag: {
        flex: 1.5,
    },
    triDown: {
        flex: 1
    },
    txtDrag: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 12,
        letterSpacing: 1.5,
        color: "#00103D",
        opacity: 0.5
    },
})
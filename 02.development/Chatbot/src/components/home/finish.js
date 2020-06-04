import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { Images } from 'res';

export default class Finish extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.viewLower}>
                <View style = {styles.viewUp}>
                    <Text style = {styles.txtUp}>Keep going -{"\n"}I need some more</Text>
                    <View>
                        <TouchableOpacity>
                            <View style = {styles.viewMore}>
                                <LinearGradient colors = {['#FF3D2C', '#AD486B', '#2F58CC']}
                                    start = {{x: 1.0, y: 2.0}}
                                    end = {{x: 0.0, y: -1.0}}
                                    locations = {[0, 0.6, 1]}
                                    style = {styles.gradMore}>
                                    <Text style = {styles.txtMore}>
                                        MORE
                                    </Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.viewDown}>
                    <Text style = {styles.txtDown}>Finish the session -{"\n"}I've got this</Text>
                    <View>
                        <TouchableOpacity>
                            <View style = {styles.viewFinish}>
                                <LinearGradient colors = {['#FF3D2C', '#AD486B', '#2F58CC']}
                                    start = {{x: -1.0, y: -1.0}}
                                    end = {{x: 1.0, y: 1.0}}
                                    locations = {[0, 0.1, 1]}
                                    style = {styles.gradFinish}>
                                    <Text style = {styles.txtFinish}>
                                        FINISH
                                    </Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewLower: {
        flex: 7,
        flexDirection: "column"
    },
    viewUp: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewDown: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    txtUp: {
        color: "#222B87",
        fontSize: 28,
        lineHeight: 37,
        textAlign: "center"
    },
    txtDown: {
        color: "#222B87",
        fontSize: 28,
        lineHeight: 37,
        textAlign: "center"
    },
    viewMore: {
        marginTop: 10,
        borderRadius: 25,
        overflow: "hidden",
        shadowColor: '#8F8F8F', // IOS
        shadowOffset: { width: -6, height: 6 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 25, // IOS
        elevation: 4, // Android
    },
    viewFinish: {
        marginTop: 10,
        borderRadius: 25,
        overflow: "hidden",
        shadowColor: '#8F8F8F', // IOS
        shadowOffset: { width: -6, height: 6 }, // IOS
        shadowOpacity: 1, // IOS,
        shadowRadius: 25, // IOS
        elevation: 4, // Android
    },
    gradMore: {
        width: 225,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    gradFinish: {
        width: 225,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    txtMore: {
        color: "white",
        fontSize: 13,
        letterSpacing: 5
    },
    txtFinish: {
        color: "white",
        fontSize: 13,
        letterSpacing: 5
    }
});

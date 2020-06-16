import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Text
} from "react-native";
import { SafeAreaView  } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Loader from 'react-native-three-dots-loader'

import { Images } from 'res';

export default class ChatHistory extends Component {
    constructor(props) {
        super(props);

        this.onBtnBackClicked.bind(this);
        this.onBtnHamburgerClicked.bind(this);
    }

    onBtnBackClicked() {
        this.props.onBtnBackClicked();
    }

    onBtnHamburgerClicked() {
        this.props.onBtnHamburgerClicked()
    }

    render() {
        let { messageData, waiting } = this.props;

        if (waiting == true) {
            messageData = [
                {waiting: true},
                ...messageData
            ]
        }

        return (
            <View style = {styles.viewUpper}>
                <LinearGradient 
                    colors={['#1B1464', '#305CD2']} 
                    style = {styles.gradUpper}
                    useAngle = {true}
                    angle = {214}>
                    <SafeAreaView style = {styles.viewMonkeyAndChat}>
                        <View style = {styles.viewMonkey}>
                            <Image style = {styles.imgMonkey} source = {Images.monkeyHead} />
                        </View>
                        <View style = {styles.viewChat}>
                            <FlatList
                                inverted
                                style = {styles.lstChat}
                                data = { messageData }
                                renderItem = {({ item }) => {
                                    return (
                                        item.waiting == true
                                        ?
                                        <View style = { styles.viewLoader }>
                                            <View style = {styles.viewLoaderWrapper }>
                                                <Loader style = { styles.loader } />
                                            </View>
                                        </View>
                                        :
                                        <View style = { styles.viewChatItem }>
                                            <View style = {styles.viewChatItemWrapper}>
                                                <Text style = { item.new ? styles.txtChatItem : styles.txtChatOldItem }>
                                                    { item.body }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => 'key' + index }
                            />
                        </View>
                    </SafeAreaView>
                    <SafeAreaView  style = {styles.viewHeader}>
                        <TouchableOpacity onPress = { () => this.onBtnBackClicked() } style ={{ padding: 12 }} >
                            <Image source = {Images.back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress = { () => this.onBtnHamburgerClicked() } style = {{padding: 10}} >
                            <Image source = {Images.hamburger} />
                        </TouchableOpacity>
                    </SafeAreaView >
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
        height: 60,
        position: "absolute",
        left: 0,
        right: 0
    },
    viewUpper: {
        flex: 3,
    },
    gradUpper: {
        flex: 1,
        flexDirection: "column"
    },
    viewMonkeyAndChat : {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: 30
    },
    viewMonkey: {
        flex: 1,
        flexDirection: "column",
        height: 75,
        width: 75,
    },
    viewChat: {
        flex: 4,
        paddingRight: 20
    },
    imgMonkey: {
        flex: 1,
        resizeMode: "contain",
    },
    lstChat: {
        
    },
    viewChatItem: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 8
    },
    viewLoader: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 8
    },
    viewChatItemWrapper: {
        marginTop: 8,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "white"
    },
    txtChatItem: {
        fontSize: 14
    },
    txtChatOldItem: {
        fontSize: 14,
        opacity: 0.5
    },
    viewLoaderWrapper: {
        marginTop: 8,
        padding: 12,
        backgroundColor: "white",
        borderRadius: 16
    }
});
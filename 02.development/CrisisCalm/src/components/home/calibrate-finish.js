import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
import { Images, Dimension } from 'res';

export default class CalibrateFinish extends Component {
    constructor(props) {
        super(props);

        this.onAnswerClicked = this.onAnswerClicked.bind(this);
    }

    onAnswerClicked() {
        this.props.onAnswerClicked();
    }

    render() {
        let { answerData, disabled } = this.props;

        let data = [
            ...answerData,
            {title: "", description: ""}
        ];
        let count = data.length;
        
        return (
            <View style = {styles.viewLower}>
                <FlatList
                    contentContainerStyle = {styles.scroll}
                    data = { data }
                    renderItem = {({ item, index }) => {
                        return (
                            index == count - 1
                            ?
                            (<View style = {styles.viewButton}>
                                <TouchableOpacity style = {styles.wrapFinish} onPress = { () => this.onAnswerClicked() } disabled = {disabled}>
                                    <View style = {styles.viewFinish}>
                                        <Text style={styles.btnFinish}>FINISH</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>)
                            :
                            (<View style = {styles.viewAnswerItem}>
                                <TouchableOpacity style = { styles.touchAnswerItem } activeOpacity = { 0.6 } disabled = {disabled}>
                                    <ImageBackground source={ Images.answerBackground3 } 
                                        style = {styles.imgAnswer} 
                                        borderRadius = {8}>
                                        <View style = {styles.viewAnswerMessage}>
                                            <Text style = {styles.txtTitle}>{item.title}</Text>
                                            <Text style = {styles.txtBody}>{item.description}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>)
                        )
                    }}
                    keyExtractor={(item, index) => 'key' + index }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewLower: {
        flex: 7
    },
    scroll: {
        paddingTop: 8,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 8
    },
    touchAnswerItem: {
        flex: 1
    },
    viewAnswerItem: {
        flex: 1,
        marginTop: 8,
        height: Dimension.cardHeight - 20,
        borderRadius: 8,
    },
    imgAnswer: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 16,
    },
    viewAnswerMessage: {
        flex: 7,
        padding: Dimension.cardPadding
    },
    txtTitle: {
        fontSize: Dimension.titleFontSize,
        color: "#293F81"
    },
    txtBody: {
        fontSize: Dimension.bodyFontSize,
        marginTop: 2,
        color: "#293F81"
    },
    viewButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    wrapFinish: {
        width: 225,
        height: 50
    },
    viewFinish: {
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
    btnFinish: {
        fontSize: 15,
        color: "white",
        letterSpacing: 5,
    },
});
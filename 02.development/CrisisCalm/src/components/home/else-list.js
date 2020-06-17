import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    FlatList,
    Text
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Images } from 'res';

const answerList = [
    {
        title: "FEAR",
        body: "Freaking out, panic, scared, keyed up, crippling fear"
    },
    {
        title: "STRESS",
        body: "Tense, unable to relax, concerned, demotivated"
    },
    {
        title: "WORRY",
        body: "Avoiding, depressed, obsessing, worried about worrying"
    },
    {
        title: "PREVENTION",
        body: "Don’t want to go wrong, make sure, escape, on-guard, prevent something from happening"
    },
    {
        title: "SHOW ME THE FULL LIST"
    }
]

export default class ElseList extends Component {
    onAnswerClicked(answer, index) {
        this.props.onAnswerClicked(answer, index);
    }

    render() {
        let { disabled } = this.props;
        return (
            <View style = {styles.viewLower}>
                <FlatList
                    contentContainerStyle = {styles.scroll}
                    data = { answerList }
                    renderItem = {({ item, index }) => {
                        return (
                            <View style = {styles.viewAnswerItem}>
                                <ImageBackground source={ Images.answerBackground1 } 
                                    style = {styles.imgAnswer} 
                                    borderRadius = {8}> 
                                    <View style = {styles.viewAnswerMessage}>
                                        <Text style = {styles.txtTitle}>{item.title}</Text>
                                        <Text style = {styles.txtBody}>{item.body}</Text>
                                    </View>
                                    <View style = {styles.viewNextButton}>
                                        <TouchableOpacity onPress={() => this.onAnswerClicked(item.body, index)} disabled = {disabled}>
                                            <Image source = {Images.roundArrowRight} />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
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
        paddingTop: 24,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 16
    },
    viewAnswerItem: {
        flex: 1,
        marginTop: 8,
        height: 110,
        borderRadius: 8,
    },
    imgAnswer: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 16,
    },
    viewAnswerMessage: {
        flex: 7,
        padding: 16
    },
    viewNextButton: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 14,
        color: "#293F81"
    },
    txtBody: {
        fontSize: 12,
        marginTop: 4,
        color: "#293F81"
    }
});
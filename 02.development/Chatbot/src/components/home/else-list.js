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

const tempdata_answerlist = [
    {
        title: "I'M WORRIED",
        body: "I'm worrying too much about preventing things that aren't likely"
    },
    {
        title: "I'M SCARED",
        body: "I'm scaring myself about things going wrong before anything is actually going wrong"
    },
    {
        title: "I'M CAUGHT UP",
        body: "I'm caught up inappropriate crippling fear of what could get even worse"
    },
    {
        title: "I'M WORRIED",
        body: "I'm worrying too much about preventing things that aren't likely"
    }
]

export default class ElseList extends Component {
    render() {
        return (
            <View style = {styles.viewLower}>
                <FlatList
                    data = { tempdata_answerlist }
                    renderItem = {({ item }) => {
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
                                        <TouchableOpacity>
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
        flex: 7,
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
        // backgroundColor: "blue"
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
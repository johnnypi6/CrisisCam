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

export default class ReactionList extends Component {
    constructor(props) {
        super(props);

        this.onAnswerClicked = this.onAnswerClicked.bind(this);
    }
    
    onAnswerClicked(answer, index) {
        this.props.onAnswerClicked(answer, index);
    }

    render() {
        let { answerData } = this.props;

        return (
            <View style = {styles.viewLower}>
                <Text style = {styles.txtComment}>TOP SELECTED REACTION</Text>
                <FlatList
                    data = { answerData }
                    renderItem = {({ item, index }) => {
                        return (
                            <View style = {styles.viewAnswerItem}>
                                <ImageBackground source={ Images.answerBackground1 } 
                                    style = {styles.imgAnswer} 
                                    borderRadius = {8}> 
                                    <View style = {styles.viewAnswerMessage}>
                                        <Text style = {styles.txtTitle}>{item.title}</Text>
                                        <Text style = {styles.txtBody}>{item.description}</Text>
                                    </View>
                                    <View style = {styles.viewNextButton}>
                                        <TouchableOpacity onPress={() => this.onAnswerClicked(item.title, index)}>
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
    txtComment: {
        color: "#5C5C5C"
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
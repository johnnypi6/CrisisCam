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
import { Images, Dimension } from 'res';

export default class ElseList extends Component {
    onAnswerClicked(answer, index) {
        this.props.onAnswerClicked(answer, index);
    }

    render() {
        let { disabled, answerData } = this.props;
        return (
            <View style = {styles.viewLower}>
                <FlatList
                    contentContainerStyle = {styles.scroll}
                    data = { answerData }
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
        paddingTop: 8,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 8
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
    viewNextButton: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    txtTitle: {
        fontSize: Dimension.titleFontSize,
        color: "#293F81"
    },
    txtBody: {
        fontSize: Dimension.bodyFontSize,
        marginTop: 2,
        color: "#293F81"
    }
});
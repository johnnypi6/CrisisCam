import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    ImageBackground,
    FlatList,
    Text
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Images, Dimension } from 'res';

export default class ReactionList extends Component {
    constructor(props) {
        super(props);

        this.onAnswerClicked = this.onAnswerClicked.bind(this);
    }
    
    onAnswerClicked(answer, index) {
        this.props.onAnswerClicked(answer, index);
    }

    render() {
        let { answerData, disabled } = this.props;

        return (
            <View style = {styles.viewLower}>
                <ScrollView contentContainerStyle = {styles.scroll}>
                    <FlatList
                        scrollEnabled = { false }
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
                                            <TouchableOpacity onPress={() => this.onAnswerClicked(item.title, index)} disabled = {disabled}>
                                                <Image source = {Images.roundArrowRight} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => 'key' + index }
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewLower: {
        flex: 7,
    },
    scroll: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 8,
        paddingBottom: 8
    },
    txtComment: {
        color: "#5C5C5C"
    },
    viewAnswerItem: {
        flex: 1,
        marginTop: 8,
        height: Dimension.cardHeight,
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
        // backgroundColor: "blue"
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
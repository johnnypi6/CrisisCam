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

export default class FirstSelectList extends Component {
    constructor(props) {
        super(props);

        this.onAnswerClicked = this.onAnswerClicked.bind(this);
    }
    
    onAnswerClicked(answer) {
        this.props.onAnswerClicked(answer);
    }

    render() {
        let { answerData, disabled } = this.props;

        return (
            <View style = {styles.viewLower}>
                <FlatList contentContainerStyle = {styles.scroll}
                    data = { answerData }
                    renderItem = {({ item }) => {
                        return (
                            <View style = {styles.viewAnswerItem}>
                                <ImageBackground source={ Images.answerBackground1 } 
                                    style = {styles.imgAnswer} 
                                    borderRadius = {8}> 
                                    <View style = {styles.viewAnswerMessage}>
                                        <Text style = {styles.txtBody}>{item.text}</Text>
                                    </View>
                                    <View style = {styles.viewNextButton}>
                                        <TouchableOpacity onPress={() => this.onAnswerClicked(item.text)} disabled = {disabled}>
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
    txtBody: {
        fontSize: Dimension.bodyUppercaseFontSize,
        marginTop: 4,
        color: "#293F81",
        textTransform: "uppercase",
        letterSpacing: 1.3,
        lineHeight: 15
    }
});
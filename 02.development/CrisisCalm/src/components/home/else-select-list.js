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

export default class ElseSelectList extends Component {
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
                <FlatList
                    contentContainerStyle = {styles.scroll}
                    data = { answerData }
                    renderItem = {({ item, index }) => {
                        return (
                            <View style = {styles.viewAnswerItem}>
                                <TouchableOpacity style = { styles.touchAnswerItem } activeOpacity = { 0.6 } disabled = {disabled} onPress = {() => {
                                    answerData.map(item => item.isSelected = false);
                                    item.isSelected = true;
                                    this.setState({ answerData });
                                    this.onAnswerClicked(item.title, index);
                                }}>
                                    <ImageBackground source={ item.isSelected ? Images.answerBackground4Highlight : Images.answerBackground3 } 
                                        style = {styles.imgAnswer} 
                                        borderRadius = {8}>
                                        <View style = {styles.viewAnswerMessage}>
                                            <Text style = {styles.txtTitle}>{item.title}</Text>
                                            <Text style = {styles.txtBody}>{item.description}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
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
    }
});
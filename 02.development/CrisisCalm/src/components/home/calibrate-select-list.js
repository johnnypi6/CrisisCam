import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
import { Images } from 'res';

export default class CalibrateSelectList extends Component {
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
                                <TouchableOpacity style = { styles.touchAnswerItem } activeOpacity = { 0.6 } disabled = { disabled } onPress = {() => {
                                    if (!item.isSelected) {
                                        item.isSelected = true;
                                        this.setState({answerData});
                                        this.onAnswerClicked(item, index);
                                    }
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
        paddingTop: 24,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 16
    },
    touchAnswerItem: {
        flex: 1
    },
    viewAnswerItem: {
        flex: 1,
        marginTop: 8,
        height: 90,
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
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList from "react-native-draggable-flatlist";

import { Images } from 'res';

export default class FirstSortList extends Component {
    constructor(props) {
        super(props);

        this.onAnswerClicked = this.onAnswerClicked.bind(this);
    }
    
    onAnswerClicked(data) {
        this.props.onAnswerClicked(data);
    }
    
    render() {
        let { disabled, answerData } = this.props;
        let data = answerData;

        return (
            <View style = {styles.viewLower}>
                <DraggableFlatList
                    contentContainerStyle={styles.scroll}
                    // style = {styles.scroll}
                    data = { data }
                    renderItem = {({ item, index, drag, isActive }) => {
                        return (
                            <View style = {styles.viewAnswerItem}>
                                <ImageBackground source={ Images.answerBackground1 } 
                                    style = {styles.imgAnswer} 
                                    borderRadius = {8}> 
                                    <View style = {styles.viewAnswerMessage}>
                                        <Text style = {styles.txtBody}>{item.body}</Text>
                                    </View>
                                    <View style = {styles.viewNextButton}>
                                        <TouchableOpacity style = {styles.touchBody} onPressIn={disabled ? null : drag}>
                                            <Image source = {Images.reorder} />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                    keyExtractor = { item => `draggable-item-${item.key}` }
                    onDragEnd = { ({ data }) => this.onAnswerClicked(data) }
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
        paddingLeft: 40,
        paddingRight: 40
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
        alignItems: "stretch"
    },
    txtBody: {
        fontSize: 12,
        marginTop: 4,
        color: "#293F81",
        textTransform: "uppercase",
        letterSpacing: 1.3,
        lineHeight: 15
    },
    touchBody: {
        height: 110, 
        flex: 0, 
        justifyContent: "center", 
        alignItems: "center"
    }
});
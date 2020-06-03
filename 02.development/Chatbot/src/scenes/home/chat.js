import React, { Component } from 'react'
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    View
} from "react-native";
import shuffle from 'shuffle-array';

import ChatHistory from 'components/home/chat-history';
import ReactionList from 'components/home/reaction-list';
import FirstSelectList from 'components/home/first-select-list';
import FirstSortList from 'components/home/first-sort-list';
import ElseList from 'components/home/else-list';
import Rate from 'components/home/rate'
import { ChatType } from 'utils/enum';
import { Images } from 'res';
import { Data } from 'res';

const timeDelay = 1000;

const tempdata_chatlist = [
    {
        body: "How do you feel right now",
        new: true
    },
    {
        body: "Hi, Mark1",
        new: true
    }
]

const tempdata_answerlist = [
    {
        title: "I'M WORRIED",
        description: "I'm worrying too much about preventing things that aren't likely"
    },
    {
        title: "I'M SCARED",
        description: "I'm scaring myself about things going wrong before anything is actually going wrong"
    },
    {
        title: "I'M CAUGHT UP",
        description: "I'm caught up inappropriate crippling fear of what could get even worse"
    },
    {
        title: "SOMETHING ELSE"
    }
]

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);

        this.firstAnswers = [];

        this.fullAlternatives = shuffle(Data.fullAlternatives.fullAlternatives);
        this.cycle = Data.monkeySpeaks.cycle;
        this.sort = Data.monkeySpeaks.sort;

        this.state = {
            type: ChatType.REACTION,
            step: 0,
            count: 0,
            messageData: tempdata_chatlist,
            answerData: tempdata_answerlist,
            waiting: false,
            nextEnabled: false
        }

        this.onNextClicked.bind(this);
    }
    
    onAnswerClicked(answer, index) {
        let { type } = this.state;

        if (type == ChatType.REACTION) {
            this.onReactionList_AnswerClicked(answer, index);
        } else if (type == ChatType.FIRSTSELECT) {
            this.onFirstSelectList_AnswerClicked(answer, index);
        } else if (type == ChatType.FIRSTSORT) {
            this.onFirstSortList_AnswerClicked(answer, index)
        }
    }
    
    onNextClicked() {
        let { type } = this.state;

        if (type == ChatType.FIRSTSORT) {
            this.onFirstSortList_NextClicked();
        }
    }

    onReactionList_AnswerClicked(answer, index) {
        let { messageData, answerData } = this.state;

        this.firstAnswers = []

        if (index == answerData.length - 1) {
            // this.state.type = ChatType.ELSE
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true },
                ...messageData
            ]
            this.setState({
                type: ChatType.FIRSTSELECT,
                messageData: messageData,
                answerData: [],
                waiting: true
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: "Choose one", new: true },
                    { body: this.cycle[0].monkeyspeaks[0].monkeyText, new: true },
                    { body: this.cycle[0].monkeyspeaks[0].title, new: true },
                    ...messageData
                ];
                answerData = this.fullAlternatives.slice(0, 2);    
                this.setState({
                    type: ChatType.FIRSTSELECT,
                    count: 0,
                    messageData: messageData,
                    answerData: answerData,
                    waiting: false
                }
            )}, timeDelay);
        }
    }

    onFirstSelectList_AnswerClicked(answer, index) {
        let { step, count, messageData, answerData } = this.state;

        if (count < 3) {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true },
                ...messageData
            ]
            this.firstAnswers.push({body: answer})

            this.setState({
                count: count + 1,
                messageData: messageData,
                answerData: [],
                waiting: true
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: "Choose one", new: true },
                    { body: this.cycle[step].monkeyspeaks[count + 1].monkeyText, new: true },
                    { body: this.cycle[step].monkeyspeaks[count + 1].title, new: true },
                    ...messageData
                ];
                let startIndex = 8 * step + 2 * count + 2;
                let endIndex = 8 * step + 2 * count  + 4;
                answerData = this.fullAlternatives.slice(startIndex, endIndex);
                this.setState({
                    messageData: messageData,
                    answerData: answerData,
                    waiting: false
                }
            )}, timeDelay);
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true },
                ...messageData
            ]
            this.firstAnswers.push({body: answer})

            this.setState({
                messageData: messageData,
                answerData: [],
                waiting: true
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: this.sort[0].monkeyspeaks[0].monkeyText, new: true },
                    ...messageData
                ];
                this.setState({
                    type: ChatType.FIRSTSORT,
                    count: 0,
                    messageData: messageData,
                    answerData: this.firstAnswers,
                    waiting: false
                }
            )}, timeDelay);
        }
    }

    onFirstSortList_AnswerClicked(answer, index) {
        let { count, messageData } = this.state;

        if (count < 3) {
            messageData.map(item => item.new = false);
            this.setState({
                count: count + 1,
                messageData: messageData,
                waiting: true
            });
            setTimeout(() => {
                messageData = [
                    { body: this.sort[0].monkeyspeaks[count + 1].monkeyText, new: true },
                    ...messageData
                ];
                this.setState({
                    messageData: messageData,
                    waiting: false,
                    nextEnabled: count == 2
                }
            )}, timeDelay);
        }
    }

    onFirstSortList_NextClicked() {
        let { step, messageData, answerData } = this.state;

        this.firstAnswers = []

        if (step < 3) {
            this.setState({
                type: ChatType.FIRSTSELECT,
                step: step + 1,
                answerData: [],
                waiting: true
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: "Choose one", new: true },
                    { body: this.cycle[step + 1].monkeyspeaks[0].monkeyText, new: true },
                    { body: this.cycle[step + 1].monkeyspeaks[0].title, new: true },
                    ...messageData
                ];
                answerData = this.fullAlternatives.slice(0, 2);    
                this.setState({
                    type: ChatType.FIRSTSELECT,
                    count: 0,
                    messageData: messageData,
                    answerData: answerData,
                    waiting: false
                }
            )}, timeDelay);
        } else {

        }
    }

    getAnswerView() {
        let { type, answerData, waiting } = this.state;
        if (type == ChatType.REACTION) {
            return <ReactionList answerData = {answerData} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSELECT) {
            return <FirstSelectList answerData = {answerData} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSORT) {
            return <FirstSortList answerData = {answerData} disable = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.ELSE) {
            return <ElseList />
        }
    }

    render() {
        const  { messageData, waiting, nextEnabled } = this.state;

        return (
            <View style = {styles.container}>
                <ChatHistory messageData = {messageData} waiting = {waiting} />
                {
                    this.getAnswerView()
                }
                {/* <Rate /> */}
                <View style = {styles.viewFooter}>
                    <View style = {{flex: 1}}></View>
                    <View style = {{flex: 1}}></View>
                    <View style = {styles.viewNext}>
                        <TouchableOpacity onPress={() => this.onNextClicked() }>
                        {
                            nextEnabled
                            ?
                            <Image source = {Images.roundArrowRight} />
                            :
                            <View></View>
                        }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    viewFooter: {
        height: 50,
        flexDirection: "row",
        borderTopColor: "#efefef",
        borderTopWidth: 2
    },
    viewNext: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40
    }
});
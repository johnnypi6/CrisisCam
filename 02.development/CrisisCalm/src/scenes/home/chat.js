import React, { Component } from 'react'
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    ScrollView
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import shuffle from 'shuffle-array';

import ChatHistory from 'components/home/chat-history';
import ReactionList from 'components/home/reaction-list';
import FirstSelectList from 'components/home/first-select-list';
import FirstSortList from 'components/home/first-sort-list';
import ElseList from 'components/home/else-list';
import ElseSelectList from 'components/home/else-select-list';
import CalibrateSelectList from 'components/home/calibrate-select-list';
import CalibrateFinish from 'components/home/calibrate-finish';
import Rate from 'components/home/rate';
import Finish from 'components/home/finish';
import { ChatType } from 'utils/enum';
import ReactionAnswerList from 'utils/reaction-answer-list';
import { Images, Data } from 'res';

const maxStep = 4;
const timeDelay = 1000;

const greetings = [
    "Hello",
    "How do you feel right now"
]

const elseAnswerData = [
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
        body: "Prevent something from happening"
    },
    {
        title: "SHOW ME THE FULL LIST"
    }
]

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);

        let { route } = this.props;
        
        this.fullAlternatives = shuffle(Data.fullAlternatives.fullAlternatives);
        this.fearReactions = Data.fearReactions.fearReactions;
        this.stressReactions = Data.stressReactions.stressReactions;
        this.worryReactions = Data.worryReactions.worryReactions;
        this.preventionReactions = Data.preventionReactions.preventionReactions;
        this.fullReactions = Data.fullReactions.fullReactions;
        this.cycle = Data.monkeySpeaks.cycle;
        this.sort = Data.monkeySpeaks.sort;
        this.calibrate = Data.monkeySpeaks.calibrate;

        this.state = {
            step: 0,
            count: 0,
            rate: 5,
            messageData: [],
            waiting: true,
            nextEnabled: false,
            firstAnswers: [],
            reactionAnswers: [],
            rates: []
        }

        if (route.params && route.params.calibrate) {
            this.fullReactions.map(item => item.isSelected = false)
            this.state.type = ChatType.CALIBRATESELECT;
            // this.state.answerData = this.fullReactions;
            this.monkeyChat({}, [this.calibrate[0].monkeyspeaks[0].monkeyText], {answerData: this.fullReactions})
        } else {
            this.state.type = ChatType.REACTION;
            this.monkeyChat({}, greetings, {answerData: ReactionAnswerList.data});
        }

        this.pastStates = [];
        this.presentState = this.state;

        this.onNextClicked = this.onNextClicked.bind(this);
        this.monkeyChat = this.monkeyChat.bind(this);
    }
    
    canUndo() {
        return this.pastStates.length > 0;
    }

    updateState(value) {
        if (JSON.stringify(value) === JSON.stringify(this.presentState))
            return;
        
        let cloneValue = JSON.parse(JSON.stringify(value));
        this.pastStates.push(this.presentState);
        this.presentState = cloneValue;
    }

    undoState() {
        this.setState(this.presentState);
        this.presentState = this.pastStates.pop();
    }

    onAnswerClicked(answer, index) {
        let { type, reactionAnswers } = this.state;

        this.updateState(this.state);

        if (type == ChatType.REACTION) {
            this.onReactionList_AnswerClicked(answer, index);
        } else if (type == ChatType.FIRSTSELECT) {
            this.onFirstSelectList_AnswerClicked(answer, index);
        } else if (type == ChatType.FIRSTSORT) {
            this.onFirstSortList_AnswerClicked(answer, index);
        } else if (type == ChatType.ELSE) {
            this.onElseList_AnswerClicked(answer, index);
        } else if (type == ChatType.ELSESELECT) {
            this.setState({
                nextEnabled: true
            })
        } else if (type == ChatType.CALIBRATESELECT) {
            this.onCalibrateSelectList_AnswerClicked(answer, index);
            reactionAnswers.push(answer);
            this.setState({reactionAnswers});
        } else if (type == ChatType.CALIBRATEFINISH) {
            this.onCalibrateFinish_AnswerClicked(answer, index);
        }
    }
    
    onNextClicked() {
        let { type } = this.state;

        this.updateState(this.state);

        if (type == ChatType.FIRSTSORT) {
            this.onFirstSortList_NextClicked();
        } else if (type == ChatType.RATE) {
            this.onRate_NextClicked();
        } else if (type == ChatType.ELSESELECT) {
            this.onElseSelectList_NextClicked();
        } else if (type == ChatType.CALIBRATEFINISH) {
            this.onCalibrateFinish_NextClicked();
        }
    }

    onBtnBackClicked() {
        let { waiting } = this.state;

        if (waiting == false) {
            if (this.canUndo())
                this.undoState()
            else
                this.props.navigation.navigate("Landing");
        }
    }

    onBtnHamburgerClicked() {
        this.props.navigation.openDrawer();
    }

    onBtnMoreClicked() {
        this.updateState(this.state);

        this.startChat();
    }

    onBtnFinishClicked() {
        this.props.navigation.push("WellDone");
    }

    onReactionList_AnswerClicked(answer, index) {
        let { messageData, answerData } = this.state;

        this.setState({
            firstAnswers: []
        });

        if (index == answerData.length - 1) {
            let firstState = {
                nextEnabled: false,
                answerData: []
            }
            let messages = [
                "Which of these most closely describes how you are feeling at the moment?"
            ]
            let lastState = {
                type: ChatType.ELSE,
                count: 0,
                answerData: elseAnswerData,
            }
            this.monkeyChat(firstState, messages, lastState);
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true, isUser: true },
                ...messageData
            ]
            answerData = this.fullAlternatives.slice(0, 2);

            let firstState = {
                messageData: messageData,
                answerData: [],
                nextEnabled: false
            }
            let messages = [
                this.cycle[0].monkeyspeaks[0].title,
                this.cycle[0].monkeyspeaks[0].monkeyText,
                "Choose one"
            ]
            let lastState = {
                type: ChatType.FIRSTSELECT,
                count: 0,
                answerData: answerData,
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onFirstSelectList_AnswerClicked(answer, index) {
        let { step, count, messageData, answerData, firstAnswers } = this.state;

        if (count < 3) {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true, isUser: true },
                ...messageData
            ]
            firstAnswers.push({body: answer})
            let startIndex = 8 * step + 2 * count + 2;
            let endIndex = 8 * step + 2 * count  + 4;
            answerData = this.fullAlternatives.slice(startIndex, endIndex);

            let firstState = {
                count: count + 1,
                messageData: messageData,
                answerData: [],
                nextEnabled: false,
                firstAnswers: firstAnswers
            }
            let messages = [
                this.cycle[step].monkeyspeaks[count + 1].title,
                this.cycle[step].monkeyspeaks[count + 1].monkeyText,
                "Choose one"
            ]
            let lastState = {
                answerData: answerData
            }
            this.monkeyChat(firstState, messages, lastState);
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true, isUser: true },
                ...messageData
            ]
            firstAnswers.push({body: answer})
            firstAnswers.map((item, index) => item.key = `item-${index}`);

            let firstState = {
                messageData: messageData,
                nextEnabled: false,
                firstAnswers: firstAnswers
            }
            let messages = [
                this.sort[0].monkeyspeaks[0].monkeyText
            ]
            let lastState = {
                type: ChatType.FIRSTSORT,
                count: 0,
                answerData: firstAnswers,
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onFirstSortList_AnswerClicked(answer, index) {
        let { count } = this.state;

        this.setState({answerData: answer});
        if (count < 3) {
            let firstState = {
                count: count + 1
            }
            let messages = [
                this.sort[0].monkeyspeaks[count + 1].monkeyText
            ]
            let lastState = {
                nextEnabled: count == 2
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onElseList_AnswerClicked(answer, index) {
        let message = ""
        let answerData = []
        if (index == 0) {
            message = "Listed below are different ways a person may feel when their “prevent instinct” triggers feelings of fear\n\n" + 
                "Select the reactions which come closest to describing how you are feeling right now";
            answerData = this.fearReactions;
        } else if (index == 1) {
            message = "Listed below are different ways a person may feel when their “prevent instinct” triggers feelings of stress\n\n" + 
                "Select the reactions which come closest to describing how you are feeling right now";
            answerData = this.stressReactions;
        } else if (index == 2) {
            message = "Listed below are different ways a person may feel when their “prevent instinct” triggers feelings of worry\n\n" + 
                "Select the reactions which come closest to describing how you are feeling right now";
            answerData = this.worryReactions;
        } else if (index == 3) {
            message = "Listed below are different ways a person may feel when their instincts trigger feelings of prevention\n\n" + 
                "Select the reactions which come closest to describing how you are feeling right now";
            answerData = this.preventionReactions;
        } else if (index == 4) {
            message = "Listed below are different ways a person may feel when their “prevent instinct” is triggered\n\n" + 
                "Select the ones which come closest to describing how you are feeling right now";
            answerData = this.fullReactions;
        }
        answerData.map(item => item.isSelected = false);

        let firstState = {
            nextEnabled: false,
            answerData: []
        }
        let messages = [
            message
        ]
        let lastState = {
            type: ChatType.ELSESELECT,
            answerData: answerData,
            nextEnabled: false
        }
        this.monkeyChat(firstState, messages, lastState);
    }

    onCalibrateSelectList_AnswerClicked(answer, index) {
        let { count, messageData, reactionAnswers } = this.state;

        if (count < 2) {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer.title, new: true, isUser: true },
                ...messageData
            ]

            let firstState = {
                messageData: messageData,
                nextEnabled: false,
                count: count + 1
            }
            let messages = [
                this.calibrate[0].monkeyspeaks[count + 1].monkeyText
            ]
            let lastState = {}
            this.monkeyChat(firstState, messages, lastState);
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer.title, new: true, isUser: true },
                ...messageData
            ]

            let firstState = {
                messageData: messageData,
                nextEnabled: false
            }
            let messages = [
                this.calibrate[0].monkeyspeaks[count + 1].monkeyText
            ]
            let lastState = {
                type: ChatType.CALIBRATEFINISH,
                count: 0,
                nextEnabled: true,
                answerData: reactionAnswers
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onCalibrateFinish_AnswerClicked(answer, index) {
        let { reactionAnswers } = this.state;

        ReactionAnswerList.data = [
            ...reactionAnswers,
            {
                title: "SOMETHING ELSE"
            }
        ]
        this.startChat();
    }

    onFirstSortList_NextClicked() {
        let { step, messageData, answerData } = this.state;

        this.setState({
            firstAnswers: []
        });
        answerData = this.fullAlternatives.slice(0, 2);

        if (step < maxStep - 1) {
            let firstState = {
                answerData: [],
                step: step + 1,
                nextEnabled: false
            }
            let messages = [
                this.cycle[step + 1].monkeyspeaks[0].title,
                this.cycle[step + 1].monkeyspeaks[0].monkeyText,
                "Choose one"
            ]
            let lastState = {
                type: ChatType.FIRSTSELECT,
                count: 0,
                answerData: answerData,
            }
            this.monkeyChat(firstState, messages, lastState);
        } else {
            this.setState({rates: []});

            let firstState = {
                answerData: [],
                step: 0,
                nextEnabled: true
            }
            let messages = [
                "Okay, how are you feeling now?",
                "Use the gauge to tell me which viewpoint feels closer and which feels further away"
            ];
            answerData = "I’M NOTICING WHAT IS OK IN THE CURRENT SCENE";
            let lastState = {
                type: ChatType.RATE,
                count: 0,
                rate: 5,
                answerData: answerData,
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onRate_NextClicked() {
        let { count, rate, rates, answerData } = this.state;

        if (count < 2) {
            rates.push(rate)

            let firstState = {
                type: ChatType.REACTION,
                answerData: [],
                count: count + 1,
                rates: rates
            }
            let messages = []
            if (count == 0) {
                messages = [
                    "Got it",
                    "Which of these feels closer and which feels further away?"
                ];
                answerData = "I PRETTY MUCH RELAX AND GO WITH THE FLOW AS LONG AS THINGS ARE FINE";
            } else if (count == 1) {
                messages = [
                    "…and which of these feels closer and which feels further away?"
                ];
                answerData = "THINKING ABOUT WHAT WOULD BE THE RIGHT OR PROPER WAY TO PROCEED"
            }
            let lastState = {
                type: ChatType.RATE,
                count: count + 1,
                rate: 5,
                answerData: answerData
            }
            this.monkeyChat(firstState, messages, lastState);
        } else {
            rates.push(rate);

            let firstState = {
                type: ChatType.REACTION,
                answerData: [],
                count: 0,
                rates: rates
            }
            let messages = []
            if (rates[0] < 5 || rates[1] < 5 || rates[2] < 5) {
                messages = [
                    "I can see you are still a little stressed and worried",
                    "Do you want to..."
                ];  
            } else {
                messages = [
                    "Great! It looks like you are a lot more relaxed",
                    "Do you want to..."
                ];  
            }
            let lastState = {
                type: ChatType.FINISH,
                answerData: [],
                nextEnabled: false
            }
            this.monkeyChat(firstState, messages, lastState);
        }
    }

    onElseSelectList_NextClicked() {
        let { answerData } = this.state;

        this.fullAlternatives = shuffle(Data.fullAlternatives.fullAlternatives);
        answerData = this.fullAlternatives.slice(0, 2);

        let firstState = {
            answerData: [],
            nextEnabled: false
        }
        let messages = [
            this.cycle[0].monkeyspeaks[0].title,
            this.cycle[0].monkeyspeaks[0].monkeyText,
            "Choose one"
        ]
        let lastState = {
            type: ChatType.FIRSTSELECT,
            count: 0,
            answerData: answerData
        }
        this.monkeyChat(firstState, messages, lastState);
    }

    onCalibrateFinish_NextClicked() {
        let { reactionAnswers } = this.state;

        ReactionAnswerList.Data = [
            ...reactionAnswers,
            {
                title: "SOMETHING ELSE"
            }
        ]
        this.startChat();
    }

    startChat() {
        let { messageData } = this.state;

        let firstState = {
            type: ChatType.REACTION,
            answerData: [],
            nextEnabled: false
        }
        let messages = greetings
        let lastState = {
            type: ChatType.REACTION,
            step: 0,
            count: 0,
            answerData: ReactionAnswerList.data,
            nextEnabled: false
        }
        this.monkeyChat(firstState, messages, lastState);
    }

    monkeyChat(firstState, monkeyMessages, lastState) {
        firstState.waiting = true;
        this.setState(firstState);

        let i = 0;
        setTimeout(function run() {
            let { messageData } = this.state;    
            messageData.map(item => item.new = false);
            messageData = [{body: monkeyMessages[i], new: true}, ...messageData]
            if (i < monkeyMessages.length - 1) {
                this.setState({messageData});
                i++
                setTimeout(run.bind(this), timeDelay);
            } else {
                lastState.messageData = messageData;
                lastState.waiting = false
                this.setState(lastState);
            }
        }
        .bind(this), timeDelay);
    }

    getAnswerView() {
        let { type, answerData, waiting, rate } = this.state;
        if (type == ChatType.REACTION) {
            return <ReactionList answerData = {answerData} disabled = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSELECT) {
            return <FirstSelectList answerData = {answerData} disabled = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSORT) {
            return <FirstSortList answerData = {answerData} disabled = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.RATE) {
            return <Rate answerData = {answerData} disabled = {waiting} value = { rate } onValueChange = { (value) => this.setState({rate: value}) } />
        } else if (type == ChatType.FINISH) {
            return <Finish disabled = {waiting} onBtnMoreClicked = { this.onBtnMoreClicked.bind(this) } onBtnFinishClicked = { this.onBtnFinishClicked.bind(this) } />
        } else if (type == ChatType.ELSE) {
            return <ElseList answerData = {answerData} disabled = {waiting} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.ELSESELECT) {
            return <ElseSelectList disabled = {waiting} answerData = {answerData} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.CALIBRATESELECT) {
            return <CalibrateSelectList answerData = {answerData} disabled = {waiting} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.CALIBRATEFINISH) {
            return <CalibrateFinish disabled = {waiting} answerData = {answerData} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        }
    }

    render() {
        const  { messageData, waiting, nextEnabled } = this.state;

        return (
            <View style = {styles.container}>
                <ChatHistory messageData = {messageData} 
                    waiting = {waiting} 
                    onBtnBackClicked = { this.onBtnBackClicked.bind(this) }
                    onBtnHamburgerClicked = { this.onBtnHamburgerClicked.bind(this) } />
                {
                    this.getAnswerView()
                }
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
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
import ElseSelectList from 'components/home/else-select-list';
import CalibrateSelectList from 'components/home/calibrate-select-list';
import CalibrateFinish from 'components/home/calibrate-finish';
import Rate from 'components/home/rate';
import Finish from 'components/home/finish';
import { ChatType } from 'utils/enum';
import ReactionAnswerList from 'utils/reaction-answer-list';
import { Images } from 'res';
import { Data } from 'res';

const maxStep = 4;
const timeDelay = 1000;

const greetings = [
    {
        body: "How do you feel right now",
        new: true
    },
    {
        body: "Hi, Mark1",
        new: true
    }
]

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);

        let { route } = this.props;

        this.firstAnswers = [];
        this.reactionAnswers = [];
        this.rates = [];

        this.fullAlternatives = shuffle(Data.fullAlternatives.fullAlternatives);
        this.fearReactions = Data.fearReactions.fearReactions;
        this.stressReactions = Data.stressReactions.stressReactions;
        this.worryReactions = Data.worryReactions.worryReactions;
        this.preventionReactions = Data.preventionReactions.preventionReactions;
        this.fullReactions = Data.fullReactions.fullReactions;
        this.cycle = Data.monkeySpeaks.cycle;
        this.sort = Data.monkeySpeaks.sort;
        this.calibrate = Data.monkeySpeaks.calibrate;

        if (route.params && route.params.calibrate) {
            this.state = {
                type: ChatType.CALIBRATESELECT,
                step: 0,
                count: 0,
                rate: 5,
                messageData: [{
                    body: this.calibrate[0].monkeyspeaks[0].monkeyText,
                    new: true
                }],
                answerData: this.fullReactions,
                waiting: false,
                nextEnabled: false
            }
        } else {
            this.state = {
                type: ChatType.REACTION,
                step: 0,
                count: 0,
                rate: 5,
                messageData: greetings,
                answerData: ReactionAnswerList.data,
                waiting: false,
                nextEnabled: false
            }
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
            this.onFirstSortList_AnswerClicked(answer, index);
        } else if (type == ChatType.ELSE) {
            this.onElseList_AnswerClicked(answer, index);
        } else if (type == ChatType.ELSESELECT) {
            this.setState({
                nextEnabled: true
            })
        } else if (type == ChatType.CALIBRATESELECT) {
            this.onCalibrateSelectList_AnswerClicked(answer, index);
            this.reactionAnswers.push(answer);
        } else if (type == ChatType.CALIBRATEFINISH) {
            this.onCalibrateFinish_AnswerClicked(answer, index);
        }
    }
    
    onNextClicked() {
        let { type } = this.state;

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
        this.props.navigation.navigate("Landing");
    }

    onBtnHamburgerClicked() {
        this.props.navigation.openDrawer();
    }

    onBtnMoreClicked() {
        this.startChat();
    }

    onBtnFinishClicked() {
        this.props.navigation.push("WellDone");
    }

    onReactionList_AnswerClicked(answer, index) {
        let { messageData, answerData } = this.state;

        this.firstAnswers = []

        if (index == answerData.length - 1) {
            this.setState({
                waiting: true,
                nextEnabled: false
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: "Which of these most closely describes how you are feeling at the moment?", new: true },
                    ...messageData
                ];
                this.setState({
                    type: ChatType.ELSE,
                    count: 0,
                    messageData: messageData,
                    answerData: [],
                    waiting: false
                })
            }, timeDelay)
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true },
                ...messageData
            ]
            this.setState({
                messageData: messageData,
                waiting: true,
                nextEnabled: false
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
                })
            }, timeDelay);
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
                waiting: true,
                nextEnabled: false
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
                })
            }, timeDelay);
        } else {
            messageData.map(item => item.new = false);
            messageData = [
                { body: answer, new: true },
                ...messageData
            ]
            this.firstAnswers.push({body: answer})

            this.setState({
                messageData: messageData,
                waiting: true,
                nextEnabled: false
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
                })
            }, timeDelay);
        }
    }

    onFirstSortList_AnswerClicked(answer, index) {
        let { count, messageData } = this.state;

        if (count < 3) {
            this.setState({
                count: count + 1,
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
                })
            }, timeDelay);
        }
    }

    onElseList_AnswerClicked(answer, index) {
        let { messageData } = this.state;

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

        this.setState({
            waiting: true,
            nextEnabled: false,
            answerData: []
        });

        setTimeout(() => {
            messageData.map(item => item.new = false);
            messageData = [
                { body: message, new: true},
                ...messageData
            ];
            this.setState({
                type: ChatType.ELSESELECT,
                messageData: messageData,
                answerData: answerData,
                waiting: false,
                nextEnabled: false
            });
        });
    }

    onCalibrateSelectList_AnswerClicked(answer, index) {
        let { messageData, count } = this.state;

        if (count < 2) {
            this.setState({
                waiting: true,
                nextEnabled: false
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    {
                        body: this.calibrate[0].monkeyspeaks[count + 1].monkeyText,
                        new: true
                    },
                    ...messageData
                ];
                this.setState({
                    count: count + 1,
                    waiting: false,
                    messageData: messageData
                })
            }, timeDelay)
        } else {
            this.setState({
                waiting: true,
                nextEnabled: false
            });

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    {
                        body: this.calibrate[0].monkeyspeaks[count + 1].monkeyText,
                        new: true
                    },
                    ...messageData
                ];
                this.setState({
                    type: ChatType.CALIBRATEFINISH,
                    count: 0,
                    waiting: false,
                    nextEnabled: true,
                    messageData: messageData,
                    answerData: this.reactionAnswers
                });
            }, timeDelay)
        }
    }

    onCalibrateFinish_AnswerClicked(answer, index) {
        ReactionAnswerList.data = [
            ...this.reactionAnswers,
            {
                title: "SOMETHING ELSE"
            }
        ]
        this.startChat();
    }

    onFirstSortList_NextClicked() {
        let { step, messageData, answerData } = this.state;

        this.firstAnswers = []

        if (step < maxStep - 1) {
            this.setState({
                step: step + 1,
                waiting: true,
                nextEnabled: false
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
                })
            }, timeDelay);
        } else {
            this.setState({
                step: 0,
                waiting: true,
                nextEnabled: true
            })

            this.rates = [];

            setTimeout(() => {
                messageData.map(item => item.new = false);
                messageData = [
                    { body: "Use the gauge to tell me which viewpoint feels closer and which feels further away", new: true },
                    { body: "Okay, how are you feeling now?", new: true },
                    ...messageData
                ];
                this.setState({
                    type: ChatType.RATE,
                    count: 0,
                    rate: 5,
                    messageData: messageData,
                    answerData: [],
                    waiting: false
                });
            }, timeDelay)
        }
    }

    onRate_NextClicked() {
        let { count, messageData, rate } = this.state;

        if (count < 2) {
            this.setState({
                count: count + 1,
                waiting: true
            });

            this.rates.push(rate)

            setTimeout(() => {
                messageData.map(item => item.new = false);
                if (count == 0) {
                    messageData = [
                        { body: "Which of these feels closer and which feels further away?", new: true },
                        { body: "Got it", new: true },
                        ...messageData
                    ];  
                } else if (count == 1) {
                    messageData = [
                        { body: "…and which of these feels closer and which feels further away?", new: true },
                        ...messageData
                    ];  
                }
                this.setState({
                    type: ChatType.RATE,
                    count: count + 1,
                    rate: 5,
                    messageData: messageData,
                    answerData: [],
                    waiting: false
                });
            }, timeDelay);
        } else {
            this.setState({
                count: 0,
                waiting: true
            })

            this.rates.push(rate);

            setTimeout(() => {
                messageData.map(item => item.new = false);
                if (this.rates[0] < 5 || this.rates[1] < 5 || this.rates[2] < 5) {
                    messageData = [
                        { body: "Do you want to...", new: true },
                        { body: "I can see you are still a little stressed and worried", new: true },
                        ...messageData
                    ];  
                } else {
                    messageData = [
                        { body: "Do you want to...", new: true },
                        { body: "Great! It looks like you are a lot more relaxed", new: true },
                        ...messageData
                    ];  
                }
                this.setState({
                    type: ChatType.FINISH,
                    messageData: messageData,
                    answerData: [],
                    waiting: false,
                    nextEnabled: false
                });
            })
        }
    }

    onElseSelectList_NextClicked() {
        let { messageData, answerData } = this.state;

        this.setState({
            waiting: true,
            nextEnabled: false
        });

        this.fullAlternatives = shuffle(Data.fullAlternatives.fullAlternatives);

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
            })
        }, timeDelay);
    }

    onCalibrateFinish_NextClicked() {
        ReactionAnswerList.Data = [
            ...this.reactionAnswers,
            {
                title: "SOMETHING ELSE"
            }
        ]
        this.startChat();
    }

    startChat() {
        let { messageData } = this.state;

        this.setState({
            waiting: true,
            nextEnabled: false
        });

        setTimeout(() => {
            messageData.map(item => item.new = false);
            greetings.map(item => item.new = true);
            messageData = [
                ...greetings,
                ...messageData
            ];
            this.setState({
                type: ChatType.REACTION,
                step: 0,
                count: 0,
                messageData: messageData,
                answerData: ReactionAnswerList.data,
                waiting: false,
                nextEnabled: false
            })
        }, timeDelay)
    }

    getAnswerView() {
        let { type, answerData, waiting, rate } = this.state;
        if (type == ChatType.REACTION) {
            return <ReactionList answerData = {answerData} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSELECT) {
            return <FirstSelectList answerData = {answerData} disabled = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.FIRSTSORT) {
            return <FirstSortList answerData = {answerData} disabled = {waiting} onAnswerClicked={ this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.RATE) {
            return <Rate value = { rate } onValueChange = { (value) => this.setState({rate: value}) } />
        } else if (type == ChatType.FINISH) {
            return <Finish onBtnMoreClicked = { this.onBtnMoreClicked.bind(this) } onBtnFinishClicked = { this.onBtnFinishClicked.bind(this) } />
        } else if (type == ChatType.ELSE) {
            return <ElseList onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.ELSESELECT) {
            return <ElseSelectList answerData = {answerData} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.CALIBRATESELECT) {
            return <CalibrateSelectList answerData = {answerData} disabled = {waiting} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
        } else if (type == ChatType.CALIBRATEFINISH) {
            return <CalibrateFinish answerData = {answerData} onAnswerClicked = { this.onAnswerClicked.bind(this) } />
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
import React, {Component} from 'react';
import Navigator from 'navigations/main-navigator';
import SplashScreen from 'react-native-splash-screen';

console.disableYellowBox = true;

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Navigator />
        );
    }
}
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import FlashMessage from "./FlashMessage";

class App extends Component {

    constructor(props) {
        super();

        this.state = {
            messageFlashed: false,
            message: "",
        };
    }

    messageGetter = (message) => {
        console.log("App component --> " + message);

        this.setState({
            messageFlashed: true,
            message: message,
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {this.state.messageFlashed &&
                <FlashMessage message={this.state.message}/>
                }
                <Form messageGetter={this.messageGetter}/>
            </div>
        );
    }
}

export default App;

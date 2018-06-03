import React, {Component, Fragment} from 'react';
import '../App.css';
import Form from './Form'
import FlashMessage from "./FlashMessage";
import Header from "./Layouts/Header"

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
            <Fragment>

                <div className="App">
                    <Header />

                    {this.state.messageFlashed &&
                    <FlashMessage message={this.state.message}/>
                    }

                    <Form messageGetter={this.messageGetter}/>
                </div>

            </Fragment>
        );
    }
}

export default App;

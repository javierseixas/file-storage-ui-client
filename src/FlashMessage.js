import React from 'react';


export default class FlashMessage extends React.Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        // return a boolean value
        console.log("Should component update");
        console.log(nextProps);
        console.log(nextState);

        return true;
    };

    render() {
        const {message} = this.props;
        return (
            <h1>{message}</h1>
        )
    }
}
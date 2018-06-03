import React from 'react';
import 'whatwg-fetch'

export default class Form extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
        responseMessage: '',
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    post = (data) => {

        let responseMessage = "";

        fetch("http://localhost:8080/files", {
            method: "POST",
            body: data
        })
            .then(res => {
                console.log(res);
                if (res.ok) {
                    this.setState({
                        name: '',
                        description: '',
                        file: '',
                    });
                    responseMessage = "Perfect!";
                    return responseMessage;
                } else if (res.status === 400) {
                    console.log("Ooops!");
                    responseMessage = "400!!!";
                    return responseMessage;
                } else {
                    console.log("Whatever! " + res.status);
                    responseMessage = "Whatever!!!";
                    return responseMessage;
                }
            })
            .then(response => {
                this.setState({
                    responseMessage: response,
                });

                this.props.messageGetter(this.state.responseMessage)
                console.log("what is here " + response);
            })
            .catch(error => {
                console.log("Error submitting form!!" + error);
                responseMessage = "Form error!!!";
                this.setState({
                    responseMessage: responseMessage
                });

                this.props.messageGetter(this.state.responseMessage)
                return responseMessage;
            });
    }


    submit = (e) => {
        e.preventDefault();

        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        data.append("file", imagedata);
        data.append("name", this.state.name);
        data.append("description", this.state.description);

        this.post(data);
    };

    render() {
        return (
            <form encType="multipart/form-data" method="POST">
                <p>
                    <label>Name</label>
                    <input name="name" placeholder='Name' value={this.state.name} onChange={e => this.change(e)}/>
                </p>
                <p>
                    <label>Description</label>
                    <input name="description" placeholder='Description' value={this.state.description}
                           onChange={e => this.change(e)}/>
                </p>
                <p>
                    <label>File</label>
                    <input name="file" type="file" placeholder='Select file' value={this.state.file}
                           onChange={e => this.change(e)}/>
                </p>
                <p>
                    <button onClick={(e) => this.submit(e)}>Upload</button>
                </p>

            </form>
        )
    }
}
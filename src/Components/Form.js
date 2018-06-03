import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'whatwg-fetch'

export default class Form extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
        responseMessage: '',
    }

    handleChange = (e) => {
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
        const { classes } = this.props;
        return (
             <form noValidate autoComplete="off" encType="multipart/form-data" method="POST">
                 <TextField
                     id="name"
                     label="Name"
                     name="name"
                     value={this.state.name}
                     onChange={e => this.handleChange(e)}
                     margin="normal"
                 />
                 <TextField
                     id="description"
                     label="Description"
                     name="description"
                     multiline
                     rowsMax="4"
                     value={this.state.description}
                     onChange={e => this.handleChange(e)}
                     margin="normal"
                 />
                 <input
                  accept="image/*"
                  id="raised-button-file"
                  type="file"
                  name="file"
                   value={this.state.file}
                   onChange={e => this.change(e)}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span">
                    Search file
                  </Button>
                </label>
                <p>
                    <button onClick={(e) => this.submit(e)}>Upload</button>
                </p>
             </form>
        )
    }
}
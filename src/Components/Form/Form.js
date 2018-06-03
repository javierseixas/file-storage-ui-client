import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileUpload } from '@material-ui/icons';

import 'whatwg-fetch'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});



class Form extends React.Component {


    state = {
        form: {
            name: '',
            description: '',
            file: '',
        },
        responseMessage: '',
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
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
                        form: {
                            name: '',
                            description: '',
                            file: '',
                        }
                    });
                    responseMessage = "File uploaded Successfully!";
                    return responseMessage;
                } else if (res.status === 400) {
                    responseMessage = "There is some field missing";
                    return responseMessage;
                } else {
                    responseMessage = "Something went wrong... :(";
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
        data.append("name", this.state.form.name);
        data.append("description", this.state.form.description);

        this.post(data);
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item sm={8}>
                    <form noValidate autoComplete="off" encType="multipart/form-data" method="POST">
                        <TextField
                            required
                            label="Name"
                            name="name"
                            className={classes.textField}
                            value={this.state.form.name}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            required
                            label="Description"
                            name="description"
                            className={classes.textField}
                            multiline
                            rows={3}
                            value={this.state.form.description}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                        />
                        <br />
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="flat-button-file"
                            multiple
                            type="file"
                          />
                          <label htmlFor="flat-button-file">
                            <Button component="span" variant="outlined" className={classes.button}>
                              Select file
                            </Button>
                          </label>
                        <br/>
                        <Button variant="contained" onClick={(e) => this.submit(e)} color="primary" className={classes.button}>
                            Upload
                            <FileUpload className={classes.rightIcon} />
                          </Button>
                    </form>
                </Grid>
            </Grid>

        )
    }
}

export default withStyles(styles)(Form);
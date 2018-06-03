import React from 'react';

export default class Form extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return(
            <form encType="multipart/form-data" method="POST">
                <p>
                    <label>Name</label>
                    <input name="name" placeholder='Name' value={this.state.name} onChange={e => this.change(e)} />
                </p>
                <p>
                    <label>Description</label>
                    <input name="description" placeholder='Description' value={this.state.description} onChange={e => this.change(e)} />
                </p>
                <p>
                    <label>File</label>
                    <input name="file" type="file" placeholder='Select file' value="" onChange={e => this.change(e)} />
                </p>
                <p><button onClick={(e) => this.submit(e)}>Upload</button></p>

            </form>
        )
    }
}
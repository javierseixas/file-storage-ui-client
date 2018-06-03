import React from 'react';
import 'whatwg-fetch'

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

        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        data.append("file", imagedata);
        data.append("name", this.state.name);
        data.append("description", this.state.description);

        fetch("http://localhost:8080/files", {
          mode: 'no-cors',
          method: "POST",
          body: data
        }).then(function (res) {
          if (res.ok) {
            alert("Perfect! ");
              console.log("Perfect!")
          } else if (res.status === 400) {
              console.log("Ooops!");
            alert("Oops! ");
          } else {
              console.log("Whatever! " + res.status);
          }
        }, function (e) {
          alert("Error submitting form!");
        });
    };

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
                    <input name="file" type="file" placeholder='Select file' value={this.state.file} onChange={e => this.change(e)} />
                </p>
                <p><button onClick={(e) => this.submit(e)}>Upload</button></p>

            </form>
        )
    }
}
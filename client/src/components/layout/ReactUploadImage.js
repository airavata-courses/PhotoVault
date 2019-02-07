import React from 'react';
const constants = require('../../config/config');


const axios = require("axios");
const img = "";

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            email: '',
            // aois: '',
            content: '',
            img_url: ''
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleselectedFile = this.handleselectedFile.bind(this);
        //console.log(constants.search);
    }
    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleUpload = (e) => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        axios
            .post(constants.search + '/api/uploadImg/upload', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        img_url: res.data.secure_url
                    });
                    console.log(this.state.img_url);
                }
            })
    }

    createPost(e) {
        e.preventDefault();


        const feed_post = {
            endpoint: {

                URL: this.state.img_url,
                caption: this.state.caption,
                location: this.state.location,
                date: Date.now().toString(),
                userId: this.state.userId


            },
            service: "uploadService"
        }
        //console.log("hwerwer", feed_post);
        axios.post(
            constants.upload,
            feed_post)
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err));

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        else {
            this.setState({

                caption: nextProps.caption,
                location: nextProps.location,
                date: Date.now().toString(),
                userId: nextProps.userId,

            });
        }
    }
    render() {
        return (
            <form onSubmit={this.createPost}>
                <input type="file" name="myImage" className="btn" onChange={this.handleselectedFile} />
                <div className="row">
                    <div className="col">
                        <button onClick={this.handleUpload} className="btn btn-primary" style={{ display: 'block', marginBottom: '4px' }}>Upload</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary"> Create Post </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default ReactUploadImage
import React from 'react';
import Lightbox from 'react-images';
import Gallery from 'react-grid-gallery';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-awesome-modal';
import SearchBar from 'material-ui-search-bar';
import TextField from '@material-ui/core/TextField';
import "react-day-picker/lib/style.css";
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
const constants = require('../../config/config');

class PhotoGallery extends React.Component {

    constructor() {
        super();

        this.state = {
            userId: '',
            picture: '',
            caption: '',
            filename: '',
            date: '',
            location: '',
            searchString: '',
            photos: [],
            publicPhotos: [],
            isPublic: false

        }
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.handleselectedFile = this.handleselectedFile.bind(this);
    }


    onChange = name => event => {
        console.log(name);
        this.setState({ [name]: event.target.value });
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    getSearchedImages() {

        axios.get(constants.search + '/api/fileOps/' + this.state.searchString)
            .then(res => {
                console.log(res);
                this.state.photos = res.data.media;
                for (let i = 0; i < res.data.total; i++) {
                    this.state.photos.push(res.data.media[i]);

                }
                console.log("here", this.state.photos);

                this.setGalleryNotEmpty();
            })
            .catch(err => console.log(err));
    }
    setGalleryEmpty() {
        this.setState({
            gallery: true
        });
    }
    setGalleryNotEmpty() {
        this.setState({
            gallery: false
        });
    }
    uploadPicture() {
        this.closeModal();

    }
    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true

        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    handleUpload = (e) => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        axios
            .post(constants.upload, data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        img_url: res.data.secure_url
                    });
                    console.log(this.state.img_url);

                    alert("Picture Successfully Uploaded");
                    this.closeModal();

                    const feed_post = {
                        endpoint: {

                            src: this.state.img_url,
                            caption: this.state.caption,
                            location: this.state.location,
                            dateUpload: Date.now().toString(),
                            userId: localStorage.getItem('user'),
                            accessRights: this.state.isPublic,
                            thumbnail: this.state.img_url,
                            thumbnailWidth: 300,
                            thumbnailHeight: 200
                        },
                        service: "uploadService"
                    }
                    console.log("upload json", feed_post);
                    // axios.post(
                    //     constants.upload,
                    //     feed_post)
                    //     .then(function (response) {
                    //         console.log(response);
                    //     })
                    //     .catch(err => console.log(err));

                }
            })
    }
    getPublicImages() {

        axios.get(constants.explore + '/explore/Public')
            .then(res => {
                console.log(res);
                //this.state.photos = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    //console.log(res.data[i]);
                    this.state.photos.push(res.data[i]);
                    console.log(this.state.photos[i]);
                }
                this.setGalleryNotEmpty();
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <button type="button"
                            class="btn btn-outline-primary btn-block "
                            onClick={() => this.getPublicImages()}>Explore Public Images

                        </button>
                    </div>
                    <div className="col">
                        <button type="button" class="btn btn-outline-primary btn-block ">My Gallery</button>
                    </div>
                </div>
                <h4></h4>
                <div className="row">
                    <div className="col-md-11 m-auto">
                        <SearchBar
                            id="searchString"

                            value={this.state.searchString}
                            onChange={(newValue) => this.setState({ searchString: newValue })}
                            onRequestSearch={() => this.getSearchedImages(this.state.searchString)}
                            style={{
                                margin: '0 auto',
                                maxWidth: 1020,
                            }}
                        /></div>
                    <div className="col">
                        <Fab color="primary" aria-label="Add" >

                            <AddIcon
                                onClick={() => this.openModal()}
                            />
                        </Fab>
                    </div>
                </div>
                <h4></h4>
                <div visible={this.state.gallery}>
                    <Gallery images={this.state.photos}
                        onClick={
                            this.openLightbox.bind(this)
                        }

                        columns={5}
                        customControls={[]
                        }
                        padding={3}
                        preloadImageDa
                        enableImageSelection={false}
                    />
                    {<Lightbox images={this.state.photos}

                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}

                    />}
                </div>

                <Modal visible={this.state.visible} width="600" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <div className="container">
                            <h4></h4>
                            <h2 style={{ textAlign: "center" }}>Add Picture</h2>

                            <div className="col">

                                <TextField
                                    id="standard-name"
                                    label="Caption"

                                    value={this.state.caption}
                                    onChange={this.onChange('caption')}
                                    margin="normal"
                                    fullWidth={true}
                                />

                                <TextField
                                    id="location"
                                    label="Location"

                                    value={this.state.location}
                                    onChange={this.onChange('location')}
                                    margin="normal"
                                    fullWidth={true}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input align="center" type="file" name="myImage" className="btn" onChange={this.handleselectedFile} />
                                </div>
                                <div className="col">
                                    <Checkbox
                                        checked={this.state.isPublic}
                                        onChange={this.handleChange('isPublic')}
                                        value="isPublic"
                                        color="primary"
                                    /> Make Public
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <button onClick={this.handleUpload} className="btn btn-info btn-block mt-4" style={{ display: 'block', marginBottom: '4px' }}>Upload</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal >

            </div >
        )
    }
}

export default PhotoGallery;

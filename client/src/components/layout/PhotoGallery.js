import React from 'react';
import Lightbox from 'react-images';
import Gallery from 'react-grid-gallery';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-awesome-modal';
import ImageUploader from 'react-images-upload';
import SearchBar from 'material-ui-search-bar';
import TextField from '@material-ui/core/TextField';
import "react-day-picker/lib/style.css";
import axios from 'axios';
import ReactUploadImage from './ReactUploadImage';
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
            photos: []

        }
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }


    onChange = name => event => {
        console.log(name);
        this.setState({ [name]: event.target.value });
    }



    onDrop(picture) {

        this.state.picture = picture;
        console.log(picture);
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
    downloadPicture() {
        axios.get(constants.search + '/download?fileId=' + "5c58c2c0351dc4059b62e0bd")
            .then(res => {
                console.log(res.data);
                window.open(res.data.value.downloadLink, "_blank");
            })

    }
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
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
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

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-11 m-auto">
                        <SearchBar
                            id="searchString"

                            value={this.state.searchString}
                            onChange={(newValue) => this.setState({ searchString: newValue })}
                            onRequestSearch={() => this.getSearchedImages(this.state.searchString)}
                            style={{
                                margin: '0 auto',
                                maxWidth: 1000,
                                margin: 10

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
                <div visible={this.state.gallery}>
                    <Gallery images={this.state.photos}
                        onClick={this.openLightbox.bind(this)}
                        columns={5}
                        customControls={[

                            <button key="downloadImage"
                                onClick={this.downloadPicture}>Get Downloadable Link</button>]}
                        padding={3}
                        enableImageSelection={false}
                    />
                    <Lightbox images={this.state.photos}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                    />
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
                            <ReactUploadImage caption={this.state.caption} location={this.state.location} userId={localStorage.getItem('user')} />
                        </div>
                    </div>
                </Modal >
            </div >
        )
    }
}

export default PhotoGallery;

import React from 'react';
import Lightbox from 'react-images';
import Gallery from 'react-grid-gallery';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-awesome-modal';
import SearchBar from 'material-ui-search-bar';
import TextField from '@material-ui/core/TextField';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
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
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  onChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openModal() {
    this.setState({
      visible: true,
      caption: '',
      location: '',
      isPublic: false
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
    document.getElementById('file').value = '';
  }

  handleChange = name => event => {
    console.log(event.target.checked);
    this.setState({ [name]: event.target.checked });
  };

  getSearchedImages() {
    axios
      .get(constants.search + '/api/fileOps/' + this.state.searchString)
      .then(res => {
        this.state.photos = [];
        for (let i = 0; i < res.data.total; i++) {
          this.state.photos.push(res.data.media[i]);
        }
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
    this.forceUpdate();
    this.setState({
      gallery: false
    });
  }
  uploadPicture() {
    this.closeModal();
  }
  openLightbox(obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  handleUpload = e => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);

    axios
      .post(constants.upload + '/api/uploadImg/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            img_url: res.data.secure_url
          });
          console.log(this.state.img_url);
          alert('Picture Successfully Uploaded');
          this.closeModal();

          const feed_post = {
            endpoint: {
              URL: this.state.img_url,
              caption: this.state.caption,
              location: this.state.location,
              date: Date.now().toString(),
              userId: localStorage.getItem('user'),
              isPublic: this.state.isPublic
            },
            service: 'uploadService'
          };

          console.log('upload json', feed_post);
          axios
            .post(constants.details, feed_post)
            .then(function(response) {
              console.log(response);
            })
            .catch(err => console.log(err));
        } else {
          console.log('error');
        }
      });
  };
  getPublicImages() {
    axios
      .get(constants.explore + '/explore/true')

      .then(res => {
        console.log(res);
        this.state.photos = [];
        for (let i = 0; i < res.data.length; i++) {
          this.state.photos.push(res.data[i]);
          console.log(this.state.photos[i]);
        }
        this.forceUpdate();
        this.setGalleryNotEmpty();
      })
      .catch(err => console.log(err));
  }
  getMyGallery() {
    axios
      .get(
        constants.search + '/api/fileOps/recent/' + localStorage.getItem('user')
      )

      .then(res => {
        console.log(res);
        this.state.photos = [];
        for (let i = 0; i < res.data.media.length; i++) {
          this.state.photos.push(res.data.media[i]);
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
            <button
              type="button"
              class="btn btn-outline-primary btn-block "
              onClick={() => this.getPublicImages()}
            >
              Explore Public Images
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              class="btn btn-outline-primary btn-block "
              onClick={() => this.getMyGallery()}
            >
              My Gallery
            </button>
          </div>
        </div>
        <h4 />
        <div className="row">
          <div className="col-md-11 m-auto">
            <SearchBar
              id="searchString"
              value={this.state.searchString}
              onChange={newValue => this.setState({ searchString: newValue })}
              onRequestSearch={() =>
                this.getSearchedImages(this.state.searchString)
              }
              style={{
                margin: '0 auto',
                maxWidth: 1020
              }}
            />
          </div>
          <div className="col">
            <Fab
              color="primary"
              aria-label="Add"
              onClick={() => this.openModal()}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        <h4 />

        <Gallery
          images={this.state.photos}
          onClick={this.openLightbox.bind(this)}
          columns={5}
          customControls={[]}
          padding={3}
          enableImageSelection={false}
        />
        {
          <Lightbox
            images={this.state.photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        }
        {/* </div> */}

        <Modal
          visible={this.state.visible}
          width="600"
          height="350"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <div className="container">
              <h4 />
              <h2 style={{ textAlign: 'center' }}>Add Picture</h2>

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
                  <input
                    id="file"
                    align="center"
                    type="file"
                    name="myImage"
                    className="btn"
                    onChange={this.handleselectedFile}
                  />
                </div>
                <div className="col">
                  <Checkbox
                    checked={this.state.isPublic}
                    onChange={this.handleChange('isPublic')}
                    value="isPublic"
                    color="primary"
                  />{' '}
                  Make Public
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    onClick={this.handleUpload}
                    className="btn btn-info btn-block mt-4"
                    style={{ display: 'block', marginBottom: '4px' }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PhotoGallery;

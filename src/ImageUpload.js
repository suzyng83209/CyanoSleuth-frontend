import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./ImageUpload.css";

const CLOUDINARY_UPLOAD_PRESET = "e0qlzi7q";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/suzyng83209/upload";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: ""
    };
  }

  onImageDrop = files => {
    console.log(files);
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url });
      }
    });
  };

  render() {
    return (
      <div>
        <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
          Drop an image or click to select a file to upload.
        </Dropzone>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div className="Image">
              {this.state.uploadedFile.name}
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ImageUpload;

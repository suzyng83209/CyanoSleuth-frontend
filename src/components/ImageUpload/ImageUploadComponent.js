import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import request from "superagent";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "e0qlzi7q";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/suzyng83209/upload";

const ImageUploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75vw;
  height: 75vw;
  max-width: 360px;
  max-height: 360px;

  background: #dddddd;
  border-radius: 4px;
  border: 2px solid grey;
  font-weight: 600;
  color: grey;
`;

const ImagePreview = styled.img`
  width: 75vw;
  height: 75vw;
  max-width: 360px;
  max-height: 360px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid grey;
`;

const ImageUploadLink = styled.input`
  display: none;
`;

const uploadFile = e => {
  const data = new FormData();
  data.append("file", e.target.files[0]);
  data.append("name", "image");
  data.append("description", "etc...");

  axios.post("http://localhost:3030/uploadFile", data).then(response => {
    console.log(response);
  });
};

class ImageUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedCloudinaryUrl: ""
    };
  }

  onFileSelect = e => {
    const { files } = e.target;
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

      const { secure_url } = response.body;

      if (secure_url !== "") {
        this.setState({ uploadedCloudinaryUrl: secure_url });
        this.props.updateImageUrl(secure_url);
      }
    });
  };

  replaceImage = () => {
    this.setState({ uploadedCloudinaryUrl: "" });
  };

  render = () => {
    const { uploadedCloudinaryUrl } = this.state;
    return (
      <div>
        {uploadedCloudinaryUrl === ""
          ? <ImageUploadButton>
              Take a picture of ...
              <ImageUploadLink
                type="file"
                accept="image/*"
                onChange={this.onFileSelect}
                capture={this.props.isMobile}
              />
            </ImageUploadButton>
          : <ImagePreview
              src={uploadedCloudinaryUrl}
              onClick={this.replaceImage}
            />}
      </div>
    );
  };
}

const mapStateToProps = store => store.userInterface;

export default connect(mapStateToProps)(ImageUploadComponent);

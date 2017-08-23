import React from "react";
import styled from "styled-components";
import axios from "axios";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ImageUploadComponent from "./ImageUploadComponent";

const AnalyzeButton = styled.button`
  height: 48px;
  width: 90vw;
  max-width: 360px;
  background: purple;
  color: white;
`;

class ImageUploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: "",
      mainColors: []
    };
  }

  updateImageUrl = url => {
    const imageName = url.split("/").reverse()[0];
    this.setState({ imageName });
  };

  analyzeImage = () => {
    axios
      .get(`http://localhost:3030/color/${this.state.imageName}`)
      .then(response => {
        console.log(response);
        this.setState({ mainColors: response.data.colors });
      });
  };

  onColorSelect = color => {
    this.props.history.push(`/analyze?test=nitrogen&color=${color}`);
  };

  render = () => {
    return (
      <div>
        <ImageUploadComponent updateImageUrl={this.updateImageUrl} />
        <AnalyzeButton onClick={this.analyzeImage}>Analyze</AnalyzeButton>
        {this.state.mainColors.map((color, i) => (
          <div
            key={i}
            style={{ background: color[0], height: "24", width: "24" }}
            onClick={() => {
              console.log("clicked");
              this.onColorSelect(color[0]);
            }}
          >
            {color[1]}%
          </div>
        ))}
      </div>
    );
  };
}

export default withRouter(ImageUploadPage);

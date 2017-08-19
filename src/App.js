import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import ReduxTest from "./ReduxTest";

import ImageUploadDropZone from "./ImageUpload";
import ImageUpload from './components/ImageUpload';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: true
    };
  }

  render() {
    return (
      <div className="App">
        <ReduxTest />
        <ImageUploadDropZone />
        <ImageUpload />
      </div>
    );
  }
}

export default App;

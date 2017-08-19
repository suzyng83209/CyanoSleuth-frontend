import React from "react";
import { connect } from "react-redux";

const ImageUploadComponent = ({ isMobile }) => (
  <div className="ImageUploadContainer">
    <label className="imageButton">
      Take a picture of ...
      <input type="file" accept="image/*" capture={isMobile} />
    </label>
  </div>
);

const mapStateToProps = store => store.userInterface;

export default connect(mapStateToProps)(ImageUploadComponent);

import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import ColorAnalysisComponent from "./ColorAnalysisComponent";

class ColorAnalysisPage extends React.Component {
  goHome = () => {
    this.props.history.push("/submit");
  };

  render = () => {
    const query = queryString.parse(this.props.location.search);
    console.log(query);
    return (
      <div>
        <ColorAnalysisComponent
          test={query.test}
          color={this.props.location.hash}
        />
        <button onClick={this.goHome}>Finish</button>
      </div>
    );
  };
}

export default withRouter(ColorAnalysisPage);

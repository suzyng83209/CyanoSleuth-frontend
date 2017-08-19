import React from "react";
import { connect } from "react-redux";

const mapStateToProps = store => store.userInterface;

class ReduxTesterComponent extends React.Component {
  render = () => {
    console.log(this.props);
    return (
      <div>
        {this.props.isMobile ? "is mobile" : "not mobile"}
      </div>
    );

  };
}

export default connect(mapStateToProps)(ReduxTesterComponent);

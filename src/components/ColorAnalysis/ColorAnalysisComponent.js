import React from "react";
import ProgressBar from "react-toolbox/lib/progress_bar";
import HealthBar from './HealthBar';

const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

const calculateColorDistance = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  console.log(rgb1, rgb2);

  const meanR = (rgb1.r + rgb2.r) / 2;
  const deltaR = Math.abs(rgb1.r - rgb2);
  const deltaG = Math.abs(rgb1.g - rgb2.g);
  const deltaB = Math.abs(rgb1.b - rgb2.b);

  return Math.sqrt(
    (((512 + meanR) * deltaR * deltaR) >> 8) +
      4 * deltaG * deltaG +
      (((767 - meanR) * deltaB * deltaB) >> 8)
  );
};

class ColorAnalysisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closestColor: {},
      fullColors: [],
      health: 0,
      colorsToTestAgainst: []
    };
  }

  hardCodedColorValues = {
    nitrogen: [
      { hex: "E1CDB5", ppm: 0 },
      { hex: "E1C6BB", ppm: 1 },
      { hex: "E0A69A", ppm: 2 },
      { hex: "E16C87", ppm: 5 },
      { hex: "DD5377", ppm: 10 },
      { hex: "D54368", ppm: 20 },
      { hex: "AA2550", ppm: 50 }
    ]
  };

  setColorsToTestAgainst = colors => {
    this.setState({ colorsToTestAgainst: colors });
  };

  findClosestColor = () => {
    const closestColor = this.state.fullColors.reduce((a, b) => {
      return a.difference < b.difference ? a : b;
    });

    const index = this.state.fullColors.findIndex(
      x => x.hex === closestColor.hex
    );

    this.setState({
      closestColor: Object.assign({}, { index: index }, closestColor),
      health: (index + 1) / this.state.fullColors.length
    });
  };

  componentDidMount = () => {
    let colorsToTestAgainst = [];

    switch (this.props.test) {
      case "nitrogen": {
        colorsToTestAgainst = this.hardCodedColorValues.nitrogen;
        break;
      }

      default: {
        // TODO
      }
    }

    const fullColors = colorsToTestAgainst.map(color =>
      Object.assign({}, color, {
        difference: calculateColorDistance(this.props.color, color.hex)
      })
    );

    this.setState(
      { fullColors: fullColors.sort((a, b) => a.ppm > b.ppm) },
      () => {
        this.findClosestColor();
      }
    );
  };

  render = () => {
    console.log(this.state.closestColor);
    return (
      <div>
        <div style={{ background: this.props.color }}>test color</div>
        {this.state.fullColors.map((color, i) => {
          return (
            <div style={{ background: color.hex }}>
              diff: {color.difference}, ppm: {color.ppm}
            </div>
          );
        })}
        <br />
        <div style={{ background: this.state.closestColor.hex }}>
          Closest Color: {this.state.closestColor.hex} <br />
          difference: {this.state.closestColor.difference} <br />
          ppm: {this.state.closestColor.ppm}
        </div>
        <br />
        <div>
          Simple health gauge:
          {" "}
          {this.state.closestColor.index + 1}
          /
          {this.state.fullColors.length}
          {" "}or{" "}
          {Math.round(this.state.health * 5)}/5
        </div>
        <div>
          Bar Health Gauge:
          <ProgressBar type="linear" mode="determinate" value={100} />
          <br />
          <HealthBar health={Math.round(this.state.health * 5)} />
        </div>
      </div>
    );
  };
}

export default ColorAnalysisComponent;

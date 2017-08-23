import React from "react";
import styled from "styled-components";

const MAX_HEALTH = 5;

const HealthIndicator = styled.div`
    background: ${props => props.backgroundColor};
    border-radius: 100px;
    height: 16px;
    width: 16px;
    margin: 4px;
`;

// const HealthIndicator = color => (
//   <div
//     style={{
//       background: color.to,
//       borderRadius: "50%",
//       margin: "4",
//       height: "16",
//       width: "16"
//     }}
//   />
// );

const HealthBar = ({ health }) => {
  const healthArray = new Array(5);
  for (let i = 0; i < MAX_HEALTH; i += 1) {
    healthArray[i] = i < health ? "green" : "grey";
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {healthArray.map((color, i) => (
        <HealthIndicator key={i} backgroundColor={color} />
      ))}
    </div>
  );
};

export default HealthBar;

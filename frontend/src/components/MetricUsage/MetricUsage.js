import React, { useState, useEffect } from "react";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";
import "./MetricUsage.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

// import { styled } from "@mui/material/styles";
// import { makeStyles } from "@material-ui/core/styles";

function MetricUsage(props) {
  const [colorProg, setColorProg] = useState("");
  let progress = (props.value * 100) / props.max;
  useEffect(() => {
    if (progress <= 25) {
      setColorProg("#47F3D0");
    } else if (progress < 50 && progress > 25) {
      setColorProg("#278EF1");
    } else if (progress < 75 && progress > 50) {
      setColorProg("#47F3D0");
    } else {
      setColorProg("#FF3E63");
    }
  }, [progress]);

  // const classes = Styles();
  return (
    <div className="metric-usage">
      <p>{props.text}</p>
      <div className="prog">
        <div className="progress">
          <ProgressBar now={progress} variant="progress_style" />
        </div>
        {/* <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%" }}
          ></div> */}
        {/* </div> */}
        <small style={{ marginLeft: "10px", marginTop: "-5px" }}>
          {props.value + " "}
          {props.unit}
        </small>
      </div>
    </div>
  );
}

export default MetricUsage;

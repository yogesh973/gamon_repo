import React, { useState } from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import "./metricGraph.css";

const Plot = createPlotlyComponent(Plotly);
const [progress, setProgress] = "";

function MetricGraph(props) {
  return (
    <>
      <div class="graph">
        <Plot
          data={[
            {
              x: props.metTime,
              y: props.metValues,
              hovertemplate: "<b>%{text}</b>",
              text: props.activity,
              showLegend: false,
              type: "scatter",
              mode: "line",

              marker: { enabled: false },
              line: { shape: "spline", smoothing: 0.8 },
              marker: { color: "#87CEEB", size: "0" },
            },
          ]}
          layout={{
            X: 0,
            xanchor: "left",
            title: "Total GPU Usage",
            width: 785,
            height: 200,
            margin: { l: 90, r: 20, b: 40, t: 20, pad: 5 },
            title: false,
            xref: 400,

            text: "GpuUsage",
            borderRadius: 20,
            xaxis: {
              autorange: true,
              title: {
                text: "seconds",
                font: {
                  family: "Courier New, monospace",
                  size: 16,
                },
              },
              // rangeslider: {
              //   range: ["00:00:00", "00:01:60"],
              //   borderColor: "blue",
              //   bgColor: "grey",
              // },
            },

            yaxis: {
              title: {
                text: props.unit,
                font: {
                  family: "Courier New, monospace",
                  size: 16,
                },
              },
            },

            plot_bgcolor: "#F5F5F5",
            // paper_bgcolor: "",

            plot_height: 300,
          }}
          config={{ displayModeBar: false }}
        />
        <div style={{ marginLeft: "48%", padding: "2%" }}>{props.text}</div>
      </div>
    </>
  );
}

export default MetricGraph;

// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// function MetricGraph(props) {
//   console.log(props.metValue, "graph value");
//   console.log(props.metTime, "graph time");
//   const options = {
//     xAxis: {
//       categories: [1, 2, 3],
//     },
//     series: [
//       {
//         data: [1, 2, 3],
//       },
//     ],
//     // events: {
//     //   load: function () {
//     //     // set up the updating of the chart each second
//     //     var series = this.series[0];
//     //     var x = new Date(props.time * 1000).toISOString().substr(14, 5);
//     //     var y = props.value;
//     //     series.addPoint([x, y], true, true);
//     //   },
//     // },
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//       <h1>{/* {props.value},{props.time} */}</h1>
//     </div>
//   );
// }

// export default MetricGraph;

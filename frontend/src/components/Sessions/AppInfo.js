import React from "react";
import "./AppInfo.css";
import LoginHeader from "../Login/Header";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// // import CircularProgress from "@mui/material/CircularProgress";
// import Plotly from "plotly.js-basic-dist";
// import createPlotlyComponent from "react-plotly.js/factory";
import MetricGraph from "../Graph/MetricGraph.js";
// import PulseLoader from "react-spinners/PulseLoader";
import MetricUsage from "../MetricUsage/MetricUsage";
import DeviceInfo from "../DeviceInfo/DeviceInfo";
// import { withRouter } from "react-router-dom";
import start from "../../asset/start.svg";
import stop from "../../asset/stop.svg";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { useDispatch, connect } from "react-redux";
import { login } from "../../features/loginAuth/loginAuthSlice";
import back from "../../asset/back.png";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import download from "../../asset/download.png";
import timer from "../../asset/timer.png";
// import TextField from "@mui/material/TextField";
import fileDownload from "js-file-download";
import requirePropFactory from "@mui/utils/requirePropFactory";

// import { useSelector } from "react-redux";
// import { selectUser } from "../../features/loginAuth/loginAuthSlice";

// const Plot = createPlotlyComponent(Plotly);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",

  boxShadow: 24,
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  padding: 4,

  boxShadow: 24,
};

var mapObj = {
  com: " ",
  ".oneplus": " ",
  ".qualcomm": " ",
  ".android": " ",
  ".display": " ",
  ".google": " ",
  ".tools": " ",
  ".internal": " ",
  ".emulation": " ",
  ".network": " ",
};

// console.log(user.name,"username")
// console.log(user.id,"id")
// console.log(user.token,"userToken")

// "id": this.props.userInfo.id , "token": this.props.userInfo.token
// const user = useSelector(selectUser);
class AppData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      basicInfo: {
        appname: this.props.location.state.value,
        id: this.props.location.state.user.id.toString(),
        token: this.props.location.state.user.token,
        // userRole: this.props.location.state.user.userRole,
      },
      deviceId: "",
      deviceName: "",
      androidVersion: "",
      versionName: "",
      cpuUsage: 0,
      appName: "",
      memoryUsage: 0,
      GpuUsage: 0,
      result: 5,
      Uploaddata: 0,
      cpuCores: 0,
      DownloadData: 0,
      loader: false,
      cpuStart: false,
      cpuValues: [],
      gpuValues: [],
      memValues: [],
      fpsValues: [],
      fpsStabilityValues: [],
      uploadValues: [],
      downloadValues: [],
      powerValues: [],
      appPowerValues: [],
      peakMemoryValues: [],
      imgArray: [],
      timeSeconds: 0,
      timerTimeSeconds: 0,
      timeValues: [],
      userInfo: null,
      power: 0,
      appPower: 0,
      fpsStability: 0,
      peakMemory: 0,
      cpuArch: "",
      avgMedianFPS: 0,
      devicetext: " ",
      devicecheck: false,
      open: false,
      openTitle: false,
      openBack: false,
      back: true,
      avgCPU: "",
      avgGPU: "",
      avgMem: "",
      avgFps: "",
      avgPower: "",
      avgFpsStability: "",
      avgPeakMemory: "",
      avgAppPower: "",
      avgUpload: "",
      avgDownload: "",
      popDuration: "",
      sessionName: "",
      popsession_id: "",
      timer: "",
      image: "",
      timerClock: "",
      sessionTitle: "",
      totalTime: "",
      cpu_activity: [],
      gpu_activity: [],
      mem_activity: [],
      fps_activity: [],
      upload_activity: [],
      download_activity: [],
      power_activity: [],

      fpsStability_activity: [],
      peakmem_activity: [],
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    // window.location.reload(false);
  };
  handleTitleClose = () => {
    let stopData = {
      appname: this.props.location.state.value,
      id: this.props.location.state.user.id.toString(),
      token: this.props.location.state.user.token,
      session_id: this.session_id,
      userRole: "user",
      sessionname: this.state.sessionTitle,
      Avg_time: this.state.timerClock,
    };

    let stopJSON = JSON.stringify(stopData);
    window.backend.stopScan(stopJSON, "false").then((result) => {
      const data = JSON.parse(result);
      console.log(data, "data");
      console.log(data.average_values, "avaerage values");
      this.setState({
        avgCPU: data.average_values.cpu_usage,
        avgGPU: data.average_values.gpu_usage,
        avgMem: data.average_values.memory_usage,
        avgFps: data.average_values.avgfps_app_usage,
        avgPower: data.average_values.power_usage,
        avgAppPower: data.average_values.apppower_app_usage,
        avgUpload: data.average_values.upload_data_usage,
        avgDownload: data.average_values.download_data_usage,
        popDuration: data.total_duraton,
        popsession_id: data.session_id,
        sessionName: data.sessionname,
        totalTime: data.totaltime,
        avgPeakMemory: data.average_values.peak_memory,
        avgFpsStability: data.average_values.fps_stabliy,
      });
      console.log(data, "stop session");
    });

    this.setState({ openTitle: false, open: true });
  };
  // handleBackClose = () => this.setState({ openBack: false });

  componentDidMount() {
    console.log(this.props);
    // console.log(this.props.usersValue)
    const basicData = JSON.stringify(this.state.basicInfo);
    console.log(this.state.basicInfo);

    console.log(basicData, "basidata");

    window.backend
      .basicInfo(basicData)
      .then((result) => {
        console.log(result, "result");
        const data = JSON.parse(result);

        this.setState({
          appName: this.props.location.state.value,
          deviceId: data.data.device_id,
          deviceName: data.data.device_name,
          androidVersion: data.data.android_version,
          versionName: data.data.version_name,
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });

    window.backend.cpuArch(this.props.location.state.value).then((result) => {
      console.log(result);
      let results = result.substring(result.indexOf(":") + 1);
      this.setState({ cpuArch: results });
      console.log(this.state.cpuArch);
    });

    window.backend.cpuCores(this.props.location.state.value).then((result) => {
      console.log(result);
      let results = result.substring(result.indexOf(":") + 1);
      this.setState({ cpuCores: results });
      console.log(this.state.cpuCores);
    });
  }

  // componentDidUpdate(prevprops) {
  // if (this.props.userInfo !== prevprops.state) {
  // this.setState({ userInfo: this.props.userInfo });
  // }
  // }

  handleCpuStart() {
    console.log(this.state.cpuStart, "cpustrtbefore");
    // setInterval(() =>{
    // let time = new Date(this.state.timeSeconds * 1000)
    // .toISOString()
    // .substr(14, 5);
    // this.setState({timer:time})

    // })

    this.setState({ cpuStart: !this.state.cpuStart, back: false }, () => {
      console.log(this.state.cpuStart, "cpustrt");
      if (this.state.cpuStart) {
        const myJson = JSON.stringify(this.state.basicInfo);
        this.setState({ loader: true });

        window.backend.startScan(myJson, "false").then((result) => {
          const data = JSON.parse(result);
          console.log(data, "start data result");
          this.session_id = data.data.session_id;
        });
        //setdeviceId(data.data.session_id)

        // const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E", "session_id": data.data.session_id }
        // const myJSON1 = JSON.stringify(persons1);
        this.timerTimeclock = setInterval(() => {
          this.setState({ timerTimeSeconds: this.state.timerTimeSeconds + 1 });
          console.log(this.state.timerTimeSeconds);
          let timerTime = new Date(this.state.timerTimeSeconds * 1000)
            .toISOString()
            .substr(14, 5);
          this.setState({ timerClock: timerTime });
          console.log(this.state.timerClock);
        }, 1000);

        this.timer = setInterval(() => {
          this.setState({
            timeSeconds: this.state.timeSeconds + 3,
          });

          let time = new Date(this.state.timeSeconds * 1000)
            .toISOString()
            .substr(14, 5);
          // this.setState({ timer: timerTime });
          if (this.state.timeValues.length < 8) {
            this.setState({
              timeValues: [...this.state.timeValues, time],
            });
          } else {
            this.state.timeValues.shift();
            this.setState({
              timeValues: [...this.state.timeValues, time],
            });
          }

          window.backend.screenshot("com.android.chrome").then((result) => {
            console.log(result, "screenshot");
            console.log(typeof result, "type");
            this.setState({
              image: result,
            });
            var screenObj = {
              image: result,
              timerClock: time,
            };
            if (this.state.imgArray.length < 8) {
              this.setState({
                imgArray: [...this.state.imgArray, screenObj],

                // timeValues: [...this.state.timeValues, time],
              });
            } else {
              this.state.imgArray.shift();
              // this.state.timeValues.shift();
              this.setState({
                imgArray: [...this.state.imgArray, screenObj],

                // timeValues: [...this.state.timeValues, time],
              });
            }
          });

          window.backend
            .cpuMetric(this.props.location.state.value)
            .then((result) => {
              let results = JSON.parse(result);
              console.log(results, "hello");
              console.log(results.cpu_metric, "cpppppppppppppuuuuuuuuu");
              this.setState({
                cpuUsage: results.cpu_metric,
              });

              console.log(this.state.cpuUsage, "cpu");
              if (this.state.cpuValues.length < 8) {
                this.setState({
                  cpuValues: [...this.state.cpuValues, results.cpu_metric],
                  cpu_activity: [
                    ...this.state.cpu_activity,
                    results.cpu_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.cpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  cpuValues: [...this.state.cpuValues, results.cpu_metric],
                  cpu_activity: [
                    ...this.state.cpu_activity,
                    results.cpu_activity,
                  ],

                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
          window.backend
            .gpuMetric(this.props.location.state.value)
            .then((result) => {
              console.log(result, "gpu_pre");
              let results = JSON.parse(result);
              console.log(results);
              console.log(result);
              this.setState({ GpuUsage: results.gpu_metric });
              // this.setState({
              // timeSeconds: this.state.timeSeconds + 3,
              // });
              // let time = new Date(this.state.timeSeconds * 1000)
              // .toISOString()
              // .substr(14, 5);
              console.log(this.state.GpuUsage, "gpu");
              if (this.state.gpuValues.length < 8) {
                this.setState({
                  gpuValues: [...this.state.gpuValues, results.gpu_metric],
                  gpu_activity: [
                    ...this.state.gpu_activity,
                    results.gpu_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.gpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  gpuValues: [...this.state.gpuValues, results.gpu_metric],
                  gpu_activity: [
                    ...this.state.gpu_activity,
                    results.gpu_activity,
                  ],

                  // timeValues: [...this.state.timeValues, time],
                });
              }
              console.log(this.state.gpuValues, "gpuValues");
              console.log(this.state.timeValues, "timeValues");
            });
          window.backend
            .memoryMetric(this.props.location.state.value)
            .then((result) => {
              let results = JSON.parse(result);
              console.log(results, "memory");
              this.setState({ memoryUsage: results.memory_metric });
              if (this.state.memValues.length < 8) {
                this.setState({
                  memValues: [...this.state.memValues, results.memory_metric],
                  mem_activity: [
                    ...this.state.mem_activity,
                    results.memory_activity,
                  ],

                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.gpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  memValues: [...this.state.memValues, results.memory_metric],
                  mem_activity: [
                    ...this.state.mem_activity,
                    results.memory_activity,
                  ],

                  // timeValues: [...this.state.timeValues, time],
                });
              }
              console.log(this.state.memoryUsage, "memory");
            });
          window.backend
            .uploadData(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = JSON.parse(result);
              console.log(results, "upload");
              this.setState({ Uploaddata: results.upload_metric });
              console.log(this.state.Uploaddata);
              if (this.state.uploadValues.length < 8) {
                this.setState({
                  uploadValues: [
                    ...this.state.uploadValues,
                    results.upload_metric,
                  ],
                  upload_activity: [
                    ...this.state.upload_activity,
                    results.upload_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.uploadValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  uploadValues: [
                    ...this.state.uploadValues,
                    results.upload_metric,
                  ],
                  upload_activity: [
                    ...this.state.upload_activity,
                    results.upload_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
          window.backend
            .downloadedData(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = JSON.parse(result);
              this.setState({ DownloadData: results.download_metric });
              console.log(this.state.DownloadData);
              if (this.state.downloadValues.length < 8) {
                this.setState({
                  downloadValues: [
                    ...this.state.downloadValues,
                    results.download_metric,
                  ],
                  download_activity: [
                    ...this.state.download_activity,
                    results.download_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.downloadValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  downloadValues: [
                    ...this.state.downloadValues,
                    results.download_metric,
                  ],
                  download_activity: [
                    ...this.state.download_activity,
                    results.download_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          // window.backend
          // .powerMetric(this.props.location.state.value)
          // .then((result) => {
          // console.log(result);
          // let results = JSON.parse(result);
          // console.log(results, "power");
          // this.setState({ power: results.power_metric });
          // console.log(this.state.power);
          // if (this.state.powerValues.length < 8) {
          // this.setState({
          // powerValues: [
          // ...this.state.powerValues,
          // results.power_metric,
          // ],
          // power_activity: [
          // ...this.state.power_activity,
          // results.power_activity,
          // ],
          // // timeValues: [...this.state.timeValues, time],
          // });
          // console.log(time, "timeeeeeeeeeeeeeeeeee");
          // } else {
          // this.state.powerValues.shift();
          // // this.state.timeValues.shift();
          // this.setState({
          // powerValues: [
          // ...this.state.powerValues,
          // results.power_metric,
          // ],
          // power_activity: [
          // ...this.state.power_activity,
          // results.power_activity,
          // ],
          // // timeValues: [...this.state.timeValues, time],
          // });
          // }
          // });

          window.backend
            .appPowerMetric(this.props.location.state.value)
            .then((result) => {
              console.log(result, "app power result");
              let results = JSON.parse(result);
              console.log(results, "app power results");
              this.setState({ appPower: results.Apppower_metric });
              console.log(this.state.appPower);
              if (this.state.appPowerValues.length < 8) {
                this.setState({
                  appPowerValues: [
                    ...this.state.appPowerValues,
                    results.Apppower_metric,
                  ],
                  power_activity: [
                    ...this.state.power_activity,
                    results.Apppower_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.appPowerValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  appPowerValues: [
                    ...this.state.appPowerValues,
                    results.Apppower_metric,
                  ],
                  power_activity: [
                    ...this.state.power_activity,
                    results.Apppower_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          window.backend
            .Peakmomery(this.props.location.state.value)
            .then((result) => {
              console.log(result, "fps result");
              let results = JSON.parse(result);
              this.setState({ peakMemory: results.peakmem_metric });
              console.log(this.state.peakMemory, "fps value");
              if (this.state.peakMemoryValues.length < 8) {
                this.setState({
                  peakMemoryValues: [
                    ...this.state.peakMemoryValues,
                    results.peakmem_metric,
                  ],
                  peakmem_activity: [
                    ...this.state.peakmem_activity,
                    results.peakmem_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.peakMemoryValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  peakMemoryValues: [
                    ...this.state.peakMemoryValues,
                    results.peakmem_metric,
                  ],
                  peakmem_activity: [
                    ...this.state.peakmem_activity,
                    results.peakmem_activity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          window.backend
            .AvgMedianFPS(this.props.location.state.value)
            .then((result) => {
              console.log(result, "fps results");
              // let result1 = result.substring(result.indexOf(":") + 1);
              let results = JSON.parse(result);
              console.log(results.median_fps, "median_fps");
              console.log(results.fps_stablity, "fps_stabiltiy");

              this.setState({
                avgMedianFPS: results.median_fps,
              });
              this.setState({
                fpsStability: results.fps_stablity,
              });
              console.log(this.state.avgMedianFPS, "fps value");
              if (this.state.fpsValues.length < 8) {
                this.setState({
                  fpsValues: [...this.state.fpsValues, results.median_fps],

                  // timeValues: [...this.state.timeValues, time],
                });
                this.setState({
                  fpsStabilityValues: [
                    ...this.state.fpsStabilityValues,
                    results.fps_stablity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.fpsValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  fpsValues: [...this.state.fpsValues, results.median_fps],
                  // fpsStabilityValues: [
                  // ...this.state.fpsStabilityValues,
                  // results.fps_stablity,
                  // ],
                  // timeValues: [...this.state.timeValues, time],
                });
                this.setState({
                  // fpsValues: [...this.state.fpsValues, results.median_fps],
                  fpsStabilityValues: [
                    ...this.state.fpsStabilityValues,
                    results.fps_stablity,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          // window.backend
          // .AvgFPSStablity(this.props.location.state.value)
          // .then((result) => {
          // console.log(result, "fps stability result");
          // let results = result.substring(result.indexOf(":") + 1);
          // this.setState({ fpsStability: results });
          // console.log(this.state.fpsStability, "fps value");
          // if (this.state.fpsStabilityValues.length < 8) {
          // this.setState({
          // fpsStabilityValues: [
          // ...this.state.fpsStabilityValues,
          // results,
          // ],
          // });
          // console.log(time, "timeeeeeeeeeeeeeeeeee");
          // } else {
          // this.state.fpsStabilityValues.shift();
          // // this.state.timeValues.shift();
          // this.setState({
          // fpsStabilityValues: [
          // ...this.state.fpsStabilityValues,
          // results,
          // ],
          // // timeValues: [...this.state.timeValues, time],
          // });
          // }
          // });
        }, 3000);
      }
    });
  }

  handleCpuStop() {
    this.setState({
      cpuStart: !this.state.cpuStart,
      back: true,
    });
    clearInterval(this.timerTimeclock);
    clearInterval(this.timer);
    this.setState({ openTitle: true });
    this.setState({ loader: false });

    // this.setState({ timer: new Date(0).toISOString().substr(14, 5) });
  }
  handleRedirect() {
    console.log(this.props.location.state, "find");

    if (this.state.back) {
      let path = "/select-page";
      this.props.history.push(path);
    }
  }
  handleFileDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  handleDownload() {
    console.log("buton clicked");
    console.log(this.state.popsession_id);
    let baseURL = "http://52.39.98.71:3000/getReport?sessionID=";

    // axios
    // .get({
    // url: `http://52.39.98.71:3000/getReport?sessionID=${this.state.popsession_id}`,
    // responseType: "blob",
    // })
    // .then((response) => {
    // console.log(response, "report");
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // document.body.appendChild(link);
    // link.click();
    // });
  }

  handleTitleChange(e) {
    var sessionTitle = e.target.value;
    this.setState({ sessionTitle: e.target.value });
  }

  render() {
    console.log(this.props.location.state.value);
    if (!this.props.location.state.user.backClick) {
      return (
        // <div style={{ position: "relative" }}>
        <div>
          <div className="appInfo">
            <LoginHeader />

            <div className="appBar">
              <p style={{ float: "left", marginLeft: "2%" }}>
                Application Statistics
              </p>

              {/* <a
href={`http://44.226.139.67:3000/getReport?sessionID=${this.state.popsession_id}`}
download
>
<img
src={download}
alt=""
className="downloadImg"
style={{ cursor: "pointer" }}
onClick={() => {
this.handleFileDownload(
"http://44.226.139.67:3000/getReport?sessionID=${this.state.popsession_id}",
"test-download.jpg"
);
}}
// onClick={() => {
// if (this.state.popsession_id !== "") {
// window.open(
// `http://44.226.139.67:3000/getReport?sessionID=${this.state.popsession_id}`
// );
// }
// }}
/>
</a> */}

              <p className="timerPara">{this.state.timerClock}</p>

              {this.state.cpuStart ? (
                <div className="start-div">
                  <img src={stop} alt="" className="start-image-style" />
                  <button
                    className="stopButton"
                    onClick={this.handleCpuStop.bind(this)}
                  >
                    Stop Scan
                  </button>
                </div>
              ) : (
                <div className="start-div">
                  <img src={start} alt="" className="start-image-style" />
                  <button
                    className="startButton"
                    onClick={this.handleCpuStart.bind(this)}
                  >
                    Start Scan
                  </button>
                </div>
              )}

              {!this.state.cpuStart && (
                <div className="start-div">
                  <img src={back} alt="" className="back-button-image-style" />
                  <button
                    className="backButton"
                    onClick={this.handleRedirect.bind(this)}
                  >
                    Back
                  </button>
                </div>
              )}

              <img src={timer} alt="" className="timerImg" />
            </div>

            <div className="cont">
              <div class="left">
                <div>
                  <DeviceInfo
                    osVersion={this.state.versionName}
                    androidVersion={this.state.androidVersion}
                    appName={this.state.appName}
                    deviceId={this.state.deviceId}
                    deviceName={this.state.deviceName}
                    cpuArch={this.state.cpuArch}
                    cpuCores={this.state.cpuCores}
                  />
                </div>
              </div>

              <div className="right">
                <div className="right-container">
                  <MetricUsage
                    value={this.state.cpuUsage}
                    text="Total CPU Usage"
                    unit="%"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.memoryUsage}
                    text="Total Memory Usage"
                    unit="MB"
                    max={1024}
                  />
                  <MetricUsage
                    value={this.state.GpuUsage}
                    text="Total GPU Usage"
                    unit="%"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.Uploaddata}
                    text="Upload data"
                    unit="MiB"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.DownloadData}
                    text="Download data"
                    unit="MiB"
                    max={100}
                  />

                  <MetricUsage
                    value={this.state.appPower}
                    text="App power"
                    unit="mAh"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.avgMedianFPS}
                    text="Median FPS"
                    max={200}
                  />
                  <MetricUsage
                    value={this.state.peakMemory}
                    text="Avg Peak Memory"
                    unit="MB"
                    max={1024}
                  />
                  <MetricUsage
                    value={this.state.fpsStability}
                    text="FPS Stability"
                    unit="%"
                    max={100}
                  />

                  <p className="screen-flow">Screen Flow</p>
                  <div className="screenshots">
                    {this.state.imgArray.map((data) => (
                      <div className="imageDiv">
                        {/* file:///home/indium/gamon_repo/frontend/src/asset/img/Img-2022-07-20-18-30-40.png */}
                        <img src={data.image.split("/public")[1]} alt="img" />
                        <span>{data.timerClock}</span>
                      </div>
                    ))}
                  </div>

                  <div class="graphs">
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.cpuValues}
                      text="CPU Usage"
                      unit="%"
                      activity={this.state.cpu_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.gpuValues}
                      text="GPU Usage"
                      unit="%"
                      activity={this.state.gpu_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.memValues}
                      text="Memory Usage"
                      unit="MB"
                      activity={this.state.mem_activity}
                    />

                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.appPowerValues}
                      text="App Power Usage"
                      unit="mAh"
                      activity={this.state.power_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.uploadValues}
                      text="Upload Data"
                      unit="MiB"
                      activity={this.state.upload_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.downloadValues}
                      text="Download Data"
                      unit="MiB"
                      activity={this.state.download_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.fpsValues}
                      text="Median FPS"
                      unit=""
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.peakMemoryValues}
                      text="Peak Memory"
                      unit="MB"
                      activity={this.state.peakmem_activity}
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.fpsStabilityValues}
                      text="FPS Stablity"
                      unit="%"
                      activity={this.state.cpu_activity}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.openTitle && (
            <Modal
              show={this.state.openTitle}
              onHide={this.handleTitleClose.bind(this)}
              dialogClassName="modal-50w"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <p style={{ color: "#278ef1", fontSize: "17px" }}>
                    Session Title
                  </p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  placeholder="Session Title"
                  onChange={this.handleTitleChange.bind(this)}
                  sx={{ width: "100%", marginBottom: 2 }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleTitleClose.bind(this)}>ok</Button>
              </Modal.Footer>
            </Modal>
          )}

          {this.state.open && (
            <div>
              <Modal
                show={this.state.open}
                onHide={this.handleClose.bind(this)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                {" "}
                <div sx={{ p: 4 }}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "19px",
                      color: "#278EF1",
                      paddingTop: "1.3%",
                    }}
                  >
                    Average Metric
                  </p>
                </div>
                <hr />
                <div className="duration">
                  <p>Session Title : {this.state.sessionTitle}</p>
                  <p>Session ID : {this.state.popsession_id}</p>
                  <p>Total Duration : {this.state.totalTime} </p>
                </div>
                <div className="popup-div">
                  <p className="popup-p">
                    Avg CPU value :
                    {" " + Math.round(this.state.avgCPU * 100) / 100 + " "}%
                  </p>
                  <p>
                    Avg GPU value :
                    {" " + Math.round(this.state.avgGPU * 100) / 100 + " "}%
                  </p>

                  <p>
                    Avg memory :
                    {" " + Math.round(this.state.avgMem * 100) / 100 + " "}MB
                  </p>

                  <p>
                    Avg uploaded data:
                    {" " + Math.round(this.state.avgUpload * 100) / 100 + " "}
                    MiB
                  </p>
                  <p>
                    Avg downloaded data :
                    {" " + Math.round(this.state.avgDownload * 100) / 100 + " "}
                    MiB
                  </p>
                  <p>
                    Avg fps value :
                    {" " + Math.round(this.state.avgFps * 100) / 100 + " "}
                  </p>

                  <p>
                    Avg App Power value :
                    {" " + Math.round(this.state.avgAppPower * 100) / 100 + " "}
                    mAh
                  </p>
                  <p>
                    Avg Peak Memory value :
                    {" " +
                      Math.round(this.state.avgPeakMemory * 100) / 100 +
                      " "}
                    MB
                  </p>
                  <p>
                    Avg FPS Stablity value :
                    {" " + this.state.avgFpsStability + " "}%
                  </p>
                </div>
                <div className="note">
                  <p>
                    If you want to look for the detailed session details check{" "}
                  </p>
                  <p>for the web app.</p>
                </div>
                <hr />
                <div className="ok">
                  <button onClick={this.handleClose.bind(this)}>Ok</button>
                </div>
              </Modal>
            </div>
          )}

          {/* {this.state.openTitle && (
<div>
<Modal
open={this.state.openTitle}
onClose={this.handleTitleClose.bind(this)}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style1}>
<p style={{ color: "#278ef1", fontSize: "17px" }}>
Session Title
</p>
<TextField
id="standard-basic"
variant="standard"
type="name"
placeholder="Session Title"
onChange={this.handleTitleChange.bind(this)}
sx={{ width: "100%", marginBottom: 2 }}
/>
<div className="ok">
<button onClick={this.handleTitleClose.bind(this)}>
Ok
</button>
</div>
</Box>
</Modal>
</div>
)}

{this.state.open && (
<div>
<Modal
open={this.state.open}
onClose={this.handleClose.bind(this)}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
<div sx={{ p: 4 }}>
<p
style={{
textAlign: "center",
fontSize: "19px",
color: "#278EF1",
paddingTop: "1.3%",
}}
>
Average Metric
</p>
</div>
<hr />
<div className="duration">
<p>Session Title : {this.state.sessionTitle}</p>
<p>Session ID : {this.state.popsession_id}</p>
<p>Total Duration : {this.state.totalTime} </p>
</div>
<div className="popup-div">
<p className="popup-p">
Avg CPU value :
{" " + Math.round(this.state.avgCPU * 100) / 100 + " "}%
</p>
<p>
Avg GPU value :
{" " + Math.round(this.state.avgGPU * 100) / 100 + " "}%
</p>

<p>
Avg memory :
{" " + Math.round(this.state.avgMem * 100) / 100 + " "}MB
</p>

<p>
Avg uploaded data:
{" " + Math.round(this.state.avgUpload * 100) / 100 + " "}
MiB
</p>
<p>
Avg downloaded data :
{" " +
Math.round(this.state.avgDownload * 100) / 100 +
" "}
MiB
</p>
<p>
Avg fps value :
{" " + Math.round(this.state.avgFps * 100) / 100 + " "}
</p>

<p>
Avg App Power value :
{" " +
Math.round(this.state.avgAppPower * 100) / 100 +
" "}
mAh
</p>
<p>
Avg Peak Memory value :
{" " +
Math.round(this.state.avgPeakMemory * 100) / 100 +
" "}
MB
</p>
<p>
Avg FPS Stablity value :
{" " + this.state.avgFpsStability + " "}%
</p>
</div>
<div className="note">
<p>
If you want to look for the detailed session details check{" "}
</p>
<p>for the web app.</p>
</div>
<hr />
<div className="ok">
<button onClick={this.handleClose.bind(this)}>Ok</button>
</div>
</Box>
</Modal>
</div>
)} */}
        </div>
      );
    }
  }
}

// const mapStateToProps = (state) =>{" "+
// return {
// login: state.login,
// };
// };

// const mapDispatchToProps = (dispatch) => {
// return {
// login: { ...dispatch, backClick: true },
// };
// };
// export default connect(mapStateToProps, mapDispatchToProps())(AppData);
export default AppData;

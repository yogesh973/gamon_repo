import React, { Component } from "react";
import { Link, MemoryRouter as Router, Route, Switch } from "react-router-dom";
// import Home from '../Home/Home';
import BasicInfo from "../Home/BasicInfo";
import LoginHeader from "../Login/Header";
import "./SelectPage.css";
import mobile from "../../asset/mobile.png";

export default class SelectPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicetext: " ",
      devicecheck: false,
    };
  }

  // async componentDidMount() {
  //   const result = await window.backend.checkdevice();
  //   console.log(result, "connectivity");

  //   console.log("before execution");
  //   const results = await window.backend.basic();
  //   console.log(results, "await results");
  //   if ((await result) === "Device Attached") {
  //     await this.setState({
  //       devicecheck: true,
  //       devicetext: "Device Attached Successfully",
  //     });
  //   } else if ((await result) === "No Device Attached") {
  //     await this.setState({
  //       devicecheck: false,
  //       devicetext: "No Device Attached Kindly Connect Your Device Properly",
  //     });
  //   }

  //   console.log("after exexution");
  // }
  componentDidMount() {
    window.backend.checkDevice().then((result) => {
      console.log(result, "connectivity");
      if (result === "Device Attached") {
        this.setState({
          devicecheck: true,
          devicetext: "Device Attached Successfully",
        });
      } else if (result === "No Device Attached") {
        this.setState({
          devicecheck: false,
          devicetext: "No Device Attached Kindly Connect Your Device Properly",
        });
      }
    });
    console.log("before execution");
    // window.backend
    //   .basic()
    //   .then((result) => {
    //     console.log(result, "basic func  result");
    //   })
    //   .catch((err) => {
    //     console.log(err, "error");
    //   });
    console.log("after exexution");
  }
  async connectdevice() {
    const result = await window.backend.checkDevice();
    console.log(result, "device att");
    if ((await result) === "Device Attached") {
      await this.setState({
        devicecheck: true,
        devicetext: "Device Attached Successfully",
      });
    } else {
      await this.setState({
        devicecheck: false,
        devicetext: "No Device Attached Kindly Connect Your Device Properly",
      });
    }
    console.log(this.state.devicecheck, "hello");
  }
  render() {
    return (
      <div>
        {this.state.devicecheck == true ? (
          <BasicInfo />
        ) : (
          <div className="select">
            <LoginHeader />
            <div className="page_container">
              <img
                src={mobile}
                alt=" "
                style={{ width: "25%", height: "70%", marginLeft: "16%" }}
              />
              <div
                style={{
                  float: "right",
                  color: "#FFFFFF",
                  display: "inline",
                  marginRight: "22%",
                  marginTop: "10%",
                }}
              >
                <p>No Device</p>
                <h1>Attached</h1>
                <small>Kindly connect your device!</small>
                <button
                  style={{
                    width: "50%",
                    height: "30px",
                    color: "black",
                    marginTop: "30px",
                    background: "#FFFFFF",
                    border: "1px solid white",
                    borderRadius: "20px",
                  }}
                  onClick={this.connectdevice.bind(this)}
                >
                  Connect Device
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

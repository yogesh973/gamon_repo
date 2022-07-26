import React, { useState } from "react";
import Modal from "react-modal";
import img from "/home/indium/gamon_repo/frontend/src/asset/androidlogo.png";

function HelloWorld() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState("");
  //const [deviceId, setdeviceId] = React.useState("");

  const persons = {
    appname: "com.google.android.play.games",
    id: "1",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E",
  };

  const myJSON = JSON.stringify(persons);

  const handleOpenModal = () => {
    setShowModal(true);

    function getBase64(file) {
      console.log(file, "hello file");
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file && file.type.match("image.*")) {
          reader.readAsDataURL(file);
        }

        // reader.onload = () => resolve(reader.result);
        // reader.onerror = (error) => reject(error);
      });
    }

    window.backend.screenshot("com.android.chrome").then((result) => {
      setResult(result);
      // getBase64(result).then((data) => console.log(data));
    });
    //window.backend.memmetric("com.android.chrome").then((result) => setResult(result));
    //window.backend.gpuMetric("com.android.chrome").then((result) => setResult(result));
    //window.backend.Uploaddata("com.android.chrome").then((result) => setResult(result));
    //window.backend.AndroidDownloadedData1("com.android.chrome").then((result) => setResult(result));
    //window.backend.AndroidCPUCores1("com.android.chrome").then((result) => setResult(result));
    //window.backend.powermetric("com.android.chrome").then((result) => setResult(result));
    //window.backend.Apppowermetric("com.android.chrome").then((result) => setResult(result));
    //window.backend.cpuarch("com.android.chrome").then((result) => setResult(result));
    // window.backend
    //   .AvgMedianFPS("com.action.survival.craft.rpg")
    //   .then((result) => setResult(result));
    //	window.backend.checkdevice().then((result) => setResult(result));
    //window.backend.openapp("com.android.chrome").then((result) => setResult(result));

    // setTimeout(function () {
    // 	window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));
    // 	setTimeout(function () {
    // 		window.backend.AvgMedianFPS("com.android.chrome").then((result) => setResult(result));

    // 	}.bind(this), 4000)

    // }.bind(this), 4000)
    // //start
    // 		setTimeout(function () {
    // 			window.backend.startscan(myJSON, "false").then((result) => {
    // 				const data = JSON.parse(result)
    // 				//setdeviceId(data.data.session_id)

    // 				const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E", "session_id": data.data.session_id }
    // 				const myJSON1 = JSON.stringify(persons1);

    // 				setResult(myJSON1)
    // 				setTimeout(function () {
    // 					window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));

    // 					setTimeout(function () {

    // 						window.backend.stopscan(myJSON1, "false").then((result) => setResult(result));

    // 					}.bind(this), 4000)

    // 				}.bind(this), 4000)

    // 			})

    // 		}.bind(this), 4000)

    // //end

    // }.bind(this), 40000)

    // window.backend.basic().then((result) => {
    //   setResult(result);
    //   console.log(result);
    //   alert(result);
    // });
    //window.backend.mylogin(myJSON).then((result) => setResult(result));
    //window.backend.getlogin().then((result) => setResult(result));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <button onClick={() => handleOpenModal()} type="button">
        Scan
      </button>
      <Modal
        appElement={document.getElementById("app")}
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
      >
        <p>{result.split("/public")[1]}</p>
        <p>{result}</p>
        {/* <p>{`process.env.PUBLIC_URL${result.split("/public")[1]}`}</p> */}
        {/* frontend/build/assets/snaps/Img-2022-07-21-12-39-28.png */}
        <p>{typeof result}</p>
        <p>{window.location.href}</p>
        <img
          src="file:///home/indium/gamon_repo/frontend/public/assets/snaps/Img-2022-07-25-14-58-27.png"
          alt=""
        />
        <img src={result} alt="" />
        <img src={img} alt="" />
        {/* <img
          src="/home/indium/gamon_repo/frontend/src/asset/androidlogo.png"
          alt=""
        /> */}
        <button onClick={() => handleCloseModal()}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default HelloWorld;

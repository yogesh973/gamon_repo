import React, { Component, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import indlogo from "../../asset/Group.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/loginAuth/loginAuthSlice";

import { useDispatch } from "react-redux";
import { logout } from "../../features/loginAuth/loginAuthSlice.js";

import {
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

const LoginHeader = () => {
  let user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(user, "user");
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOut = () => {
    dispatch(logout());
    history.push("/");
  };

  // const [state, setState] = useState({
  //   isChecked: false,
  //   connection: false,
  // });

  // const redirect = () => {
  //   if (props.history.location.pathname) {
  //     let redirect_path = `/signin?continue=${window.location.href
  //       .split("/")
  //       .slice(3)
  //       .join("/")}`;
  //     props.history.push(redirect_path);
  //   }
  // };

  // const logout = () => {
  //   var email = localStorage.getItem("email");
  //   var password = localStorage.getItem("password");
  //   var rememberMe = localStorage.getItem("rememberMe");
  //   var login_email = localStorage.getItem("login_email");
  //   localStorage.clear();
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("password", password);
  //   localStorage.setItem("rememberMe", rememberMe);
  //   localStorage.setItem("login_email", login_email);
  //   window.location = "/aladdin-landing";
  // };

  // if (!user) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/",
  //       }}
  //     />
  //   );
  // } else {
  return (
    <div className="header">
      <header>
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}></Link>
        <img
          src={indlogo}
          alt=" "
          style={{
            float: "left",
            marginLeft: "3%",
            width: "4%",
            objectFit: "contain",
          }}
        />
        <h2
          style={{
            float: "left",
            marginLeft: "10px",
            fontSize: "22px",
            paddingTop: "1%",
          }}
        >
          GameOn
        </h2>
        <div>
          <button
            onClick={handleLogOut}
            style={{
              width: "6%",
              background: "blue",
              color: "white",
              borderRadius: "4px",
              float: "right",
              marginTop: "1.5%",
              fontSize: "14px",
              marginRight: "2%",
            }}
          >
            Log out
          </button>

          <p
            style={{
              float: "right",
              marginRight: "1%",
              paddingTop: "1.5%",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Vivek
          </p>
        </div>
      </header>
    </div>
  );
  // }
};

// class LoginHeader extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       isChecked: false,
//       connection: false,
//     };
//   }

//   redirect = () => {
//     if (props.history.location.pathname) {
//       let redirect_path = `/signin?continue=${window.location.href
//         .split("/")
//         .slice(3)
//         .join("/")}`;
//       props.history.push(redirect_path);
//     }
//   };

//   logout = () => {
//     var email = localStorage.getItem("email");
//     var password = localStorage.getItem("password");
//     var rememberMe = localStorage.getItem("rememberMe");
//     var login_email = localStorage.getItem("login_email");
//     localStorage.clear();
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//     localStorage.setItem("rememberMe", rememberMe);
//     localStorage.setItem("login_email", login_email);
//     window.location = "/aladdin-landing";
//   };

//   render() {
//     var profile = <i className="bi bi-person-square iconStyleHeader"></i>;

//     return (
//       <div className="header">
//         <header>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={{ pathname: "/" }}
//           ></Link>
//           <img
//             src={indlogo}
//             alt=" "
//             style={{
//               float: "left",
//               marginLeft: "3%",
//               width: "4%",
//               objectFit: "contain",
//             }}
//           />
//           <h2
//             style={{
//               float: "left",
//               marginLeft: "10px",
//               fontSize: "22px",
//               paddingTop: "1%",
//             }}
//           >
//             GameOn
//           </h2>
//           <p style={{ float: "right", marginRight: "10%", paddingTop: "2%" }}>
//             {user.name}
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

export default withRouter(LoginHeader);

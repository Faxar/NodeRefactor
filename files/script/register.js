// var socket = io();

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: "",
      password: "",
      createStatus: "",
      defaultUser: true
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onLogin = e => {
    console.log("Login");
    e.preventDefault();
    // socket.emit(
    //   'login',
    //   { username: this.state.user, userPassword: this.state.password },
    //   function(servResponse) {
    //     console.log('app side response' + servResponse);
    //   }
    // );
    this.populateStorage();
  };

  onRegister = () => {
    console.log("Register");
    // socket.emit(
    //   "regMe",
    //   {
    //     userAccount: this.state.user,
    //     userPass: this.state.password
    //   },
    //   serverResponse => {
    //     if (serverResponse.userCreated) {
    //       sessionStorage.setItem("userToken", serverResponse.tokenThatCreated);
    //       this.setState({ createStatus: "User was created" });
    //     } else {
    //       this.setState({ createStatus: "Failed to create user" });
    //     }
    //   }
    // );
    sessionStorage.setItem("user", this.state.user);
    this.setState({ createStatus: "User have been registered" });
    this.provideConfirmation();
  };

  populateStorage = () => {
    sessionStorage.setItem("user", this.state.user);
  };

  provideConfirmation = () => {
    setTimeout(() => {
      this.setState({ createStatus: "" });
    }, 5000);
  };

  render() {
    const { user, password, createStatus, isLogin, defaultUser } = this.state;
    let dropDownContent;
    let userCred = defaultUser ? "Guest" : this.state.user;

    if (isLogin) {
      dropDownContent = <RegisteredDropDownMenu />;
    } else {
      dropDownContent = <UnRegisteredDropDownMenu />;
    }

    return (
      <React.Fragment>
        <div className="main">
          <div className="card-body">
            <div className="regForm">
              <label htmlFor="user">User</label>
              <br />
              <input
                type="text"
                name="user"
                placeholder="Enter User Name..."
                value={user}
                onChange={this.onChange}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="text"
                name="password"
                placeholder="Enter password..."
                value={password}
                onChange={this.onChange}
              />
              <div id="buttonContainer">
                <button onClick={this.onLogin}>LogIn</button>
                <button onClick={this.onRegister}>Register</button>
              </div>
              <div className="userResponseStatus">{createStatus}</div>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="controlPane">
            <a href="index.html" className="fas fa-home" />
            <a href="list.html" className="fas fa-list" />
            <a href="" className="fas fa-cocktail" />
            <a href="" className="fas fa-book" />
            <a href="" className="fas fa-wrench" />
          </div>
        </div>
        <div className="footer">some text</div>
        <div className="head">
          <div className="userPro">
            <div className="userPane" />
            <div id="userCred">{userCred}</div>
            <div className="dropdown-content">{dropDownContent}</div>
          </div>
          <div className="mid" />
        </div>
      </React.Fragment>
    );
  }
}

function RegisteredDropDownMenu() {
  return (
    <React.Fragment>
      <a href="#popup1" style={{ display: "none" }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: "block" }}>
        Sign out
      </a>
    </React.Fragment>
  );
}

function UnRegisteredDropDownMenu() {
  return (
    <React.Fragment>
      <a href="register.html" style={{ display: "none" }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: "none" }}>
        Sign out
      </a>
    </React.Fragment>
  );
}

function loggedUser() {}

ReactDOM.render(
  <RegisterForm />,
  document.getElementsByClassName("wrapper")[0]
);

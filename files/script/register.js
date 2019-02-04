class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: '',
      password: '',
      createStatus: ''
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.verifyUser(e.target.user.value);
    this.populateStorage();
  };

  populateStorage = () => {
    sessionStorage.setItem('user', this.state.user);
  };

  verifyUser = e => {
    console.log('verify user');
    e === 'Vassili'
      ? this.setState({ createStatus: 'User created', isLogin: true })
      : this.setState({ createStatus: "User can't be created" });
    this.provideConfirmation();
  };

  provideConfirmation = () =>
    setTimeout(() => {
      this.setState({ createStatus: '' });
    }, 5000);

  render() {
    const { user, password, createStatus, isLogin } = this.state;
    let dropDownContent;
    let loggedInUser;

    if (user !== '' && isLogin) {
      loggedInUser = user;
    } else {
      loggedInUser = '';
    }

    if (isLogin) {
      dropDownContent = <RegisteredDropDownMenu />;
    } else {
      dropDownContent = <UnRegisteredDropDownMenu />;
    }

    return (
      <React.Fragment>
        <div className="main">
          <div className="card-body">
            <form className="regForm" onSubmit={this.onSubmit}>
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
              <br />
              <input type="submit" value="Submit" id="regSub" />
            </form>
            <div className="userResponseStatus">{createStatus}</div>
          </div>
        </div>
        <div className="sidebar">
          <div className="controlPane">
            <a href="index.html" className="fas fa-home" />
            <a href="list.html" className="fas fa-list" />
            <a href="register.html" className="fas fa-cocktail" />
            <a href="" className="fas fa-book" />
            <a href="" className="fas fa-wrench" />
          </div>
        </div>
        <div className="footer">some text</div>
        <div className="head">
          <div className="userPro">
            <div className="userPane" />
            <div id="userCred">{loggedInUser}</div>
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
      <a href="#popup1" style={{ display: 'none' }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: 'block' }}>
        Sign out
      </a>
      <a href="" style={{ display: 'none' }}>
        Register
      </a>
    </React.Fragment>
  );
}

function UnRegisteredDropDownMenu() {
  return (
    <React.Fragment>
      <a href="#popup1" style={{ display: 'block' }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: 'none' }}>
        Sign out
      </a>
      <a href="">Register</a>
    </React.Fragment>
  );
}

ReactDOM.render(
  <RegisterForm />,
  document.getElementsByClassName('wrapper')[0]
);

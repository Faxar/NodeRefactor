class Scripts extends React.Component {
  constructor() {
    super();
    this.state = {
      user:
        sessionStorage.getItem('user') === null
          ? 'Guest'
          : sessionStorage.getItem('user'),
      defaultUser: sessionStorage.getItem('user') === null ? true : false
    };
  }

  render() {
    const { user, defaultUser } = this.state;
    let dropDownContent;

    if (!defaultUser) {
      dropDownContent = <RegisteredDropDownMenu />;
    } else {
      dropDownContent = <UnRegisteredDropDownMenu />;
    }

    return (
      <React.Fragment>
        <div className="main">
          <div className="mainBox">
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
            <div className="box">4</div>
            <div className="box">5</div>
            <div className="box">6</div>
            <div className="box">7</div>
            <div className="box">8</div>
            <div className="box">9</div>
            <div className="box">10</div>
          </div>
        </div>
        <div className="sidebar">
          <div className="controlPane">
            <a href="index.html" className="fas fa-home" />
            <a href="list.html" className="fas fa-list" />
            <a href="api.html" className="fas fa-cocktail" />
            <a href="" className="fas fa-book" />
            <a href="" className="fas fa-wrench" />
          </div>
        </div>
        <div className="footer">some text</div>
        <div className="head">
          <div className="userPro">
            <div className="rets">
              <div id="userCred">{user}</div>
            </div>
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
    </React.Fragment>
  );
}

function UnRegisteredDropDownMenu() {
  return (
    <React.Fragment>
      <a href="register.html" style={{ display: 'block' }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: 'none' }}>
        Sign out
      </a>
    </React.Fragment>
  );
}

ReactDOM.render(<Scripts />, document.getElementsByClassName('wrapper')[0]);

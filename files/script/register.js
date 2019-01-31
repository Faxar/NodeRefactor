class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      createStatus: ''
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.verifyUser(e.target.user.value);
  };

  verifyUser = e => {
    console.log('verify user');
    e === 'Vassili'
      ? this.setState({ createStatus: 'User created' })
      : this.setState({ createStatus: "User can't be created" });

    this.clearUserStatus();
  };

  clearUserStatus = () => {
    console.log('clear status');
    setTimeout(() => {
      this.setState({ createStatus: '' });
    }, 5000);
  };

  render() {
    const { user, password, createStatus } = this.state;

    return (
      <React.Fragment>
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
        <div className="userNotification">{createStatus}</div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <RegisterForm />,
  document.getElementsByClassName('card-body')[0]
);

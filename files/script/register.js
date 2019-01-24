class RegisterForm extends React.Component {
  state = {
    user: "",
    password: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { user, password } = this.state;

    return (
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
          <input type="submit" value="Submit" id="regSub" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<RegisterForm />, document.getElementsByClassName("rect")[0]);


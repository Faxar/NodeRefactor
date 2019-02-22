var socket = io();

class GetItems extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  populateDBItems = () => {
    console.log('clicked');
    socket.emit('populate', serverResp => {
      console.log(serverResp);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="main">
          <div>
            <button onClick={this.populateDBItems}>Get Items</button>
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
            <div id="userCred" />
            <div className="dropdown-content" />
          </div>
          <div className="mid" />
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<GetItems />, document.getElementsByClassName('wrapper')[0]);

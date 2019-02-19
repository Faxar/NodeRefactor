var socket = io();

$('getItems').click();

class getItems extends React.Component {
  constructor() {
    super(),
      (state = {
        ingredients: []
      });
  }

  getIngredients = () => {};

  render() {
    return (
      <React.Fragment>
        <div className="main" />
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

ReactDOM.render(
  <RegisterForm />,
  document.getElementsByClassName('wrapper')[0]
);

class Listr extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultUser: true,
      user: sessionStorage.getItem("user")
    };
  }
  render() {
    let { defaultUser, user } = this.state;
    let dropDownContent;

    if (!defaultUser) {
      dropDownContent = <RegisteredDropDownMenu />;
    } else {
      dropDownContent = <UnRegisteredDropDownMenu />;
    }

    return (
      <React.Fragment>
        <div className="main">
          <div className="lists">
            <div className="list" id="allIng">
              <input
                type="text"
                placeholder="Search for Ingredients..."
                id="allIngSearch"
              />
              <table className="items" id="apiItems">
                <tr className="header">
                  <th>Ingredients</th>
                </tr>
                <tr className="item">
                  <td>Item1</td>
                </tr>
                <tr className="item">
                  <td>Item2</td>
                </tr>
                <tr className="item">
                  <td>Item3</td>
                </tr>
                <tr className="item">
                  <td>Item4</td>
                </tr>
                <tr className="item">
                  <td>Item5</td>
                </tr>
                <tr className="item">
                  <td>Item6</td>
                </tr>
              </table>
            </div>
            <div className="list" id="userIng">
              <input type="text" placeholder="Search for Ingredients..." />
              <table className="items" id="userItems">
                <tr className="header">
                  <th>Available Ingredients</th>
                </tr>
                <tr>
                  <td>Item1</td>
                </tr>
                <tr>
                  <td>Item2</td>
                </tr>
              </table>
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
        <div className="head">
          <div className="userPro">
            <div className="rets">
              <div id="userCred">{user}</div>
            </div>
            <div className="dropdown-content">{dropDownContent}</div>
          </div>
          <div className="mid" />
        </div>
        <div className="footer">some text</div>
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
      <a href="register.html" style={{ display: "block" }} id="getIn">
        Sign In
      </a>
      <a href="" style={{ display: "none" }}>
        Sign out
      </a>
    </React.Fragment>
  );
}

ReactDOM.render(<Listr />, document.getElementsByClassName("wrapper")[0]);

// let filterInput = document.getElementById("allIngSearch");

// filterInput.addEventListener("keyup", filterName);

// function filterName() {
//   console.log($("#allIngSearch").val());

//   let filterSearch = $("#allIngSearch").val();

//   let tr = $(".items").find(".item");

//   for (let i = 0; i < tr.length; i++) {
//     let td = tr[i].getElementsByTagName("td")[0];
//     if (td.innerHTML.toUpperCase().indexOf(filterSearch) > -1) {
//       tr[i].style.display = "";
//     } else {
//       tr[i].style.display = "none";
//     }
//   }
// }

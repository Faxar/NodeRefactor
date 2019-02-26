var socket = io();

class Listr extends React.Component {
  constructor() {
    super();
    this.state = {
      allIngredients: [],
      userIngredients: [],
      defaultUser: true,
      user: ''
    };
  }

  componentDidMount() {
    console.log('starting');
    let { allIngredients, user } = this.state;
    if (sessionStorage.getItem('user') !== null) {
      this.setState({
        user: sessionStorage.getItem('user'),
        defaultUser: false
      });
    } else {
      this.setState({ user: 'Guest' });
    }
    console.log(allIngredients.length < 1);
    console.log(this.state.defaultUser);
    if (allIngredients.length < 1) {
      console.log('logged in and emitting');
      socket.emit('populate', user, response => {
        console.log(response);
      });
    }
  }

  filter(e) {
    this.setState({ filter: e.target.value });
  }

  fetchDetails = e => {
    let clickedItemName = e.target.childNodes[0].textContent;
    let { userIngredients, allIngredients } = this.state;
    let usering = userIngredients;
    let newIng = allIngredients.filter(ing => {
      if (ing.strIngredient1 !== clickedItemName) {
        return ing;
      } else {
        usering.push(ing);
      }
    });
    this.setState({ allIngredients: newIng, userIngredients: usering });
  };

  renderAPIRows(data) {
    return data.map((ingr, index) => {
      return (
        <tr
          className="item"
          key={index}
          data-item={ingr}
          onClick={this.fetchDetails}
        >
          <td>{ingr.strIngredient1}</td>
        </tr>
      );
    });
  }

  renderUserRows(items) {
    return items.map(it => {
      return (
        <tr className="item">
          <td>{it.strIngredient1}</td>
        </tr>
      );
    });
  }

  // onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { defaultUser, user, allIngredients, userIngredients } = this.state;
    let dropDownContent;

    if (this.state.filter) {
      allIngredients = allIngredients.filter(item =>
        item.strIngredient1
          .toLowerCase()
          .includes(this.state.filter.toLowerCase())
      );
    }

    if (!defaultUser) {
      dropDownContent = <RegisteredDropDownMenu />;
    } else {
      dropDownContent = <UnRegisteredDropDownMenu />;
    }

    return (
      <React.Fragment>
        <div className="main">
          <div className="lists">
            <div
              className="list"
              id="allIng"
              style={{
                overflow: 'scroll',
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
            >
              <input
                type="text"
                name="allIngredients"
                placeholder="Search for Ingredients..."
                id="allIngSearch"
                onChange={this.filter.bind(this)}
              />
              <table className="items" id="apiItems">
                <tbody>
                  <tr className="header">
                    <th>Ingredients</th>
                  </tr>
                  {this.renderAPIRows(allIngredients)}
                </tbody>
              </table>
            </div>
            <div className="list" id="userIng">
              <input type="text" placeholder="Search for Ingredients..." />
              <table className="items" id="userItems">
                <tbody>
                  <tr className="header">
                    <th>Available Ingredients</th>
                  </tr>
                  {this.renderUserRows(userIngredients)}
                </tbody>
              </table>
            </div>
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

function ReturnedItem(item) {
  return (
    <React.Fragment>
      <tr className="item">
        <td>{item}</td>
      </tr>
    </React.Fragment>
  );
}

ReactDOM.render(<Listr />, document.getElementsByClassName('wrapper')[0]);

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

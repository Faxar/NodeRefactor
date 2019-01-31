class Scripts extends React.Component {
  constructor() {
    super();
    this.state = {
      user: sessionStorage.getItem("user")
    };
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <div id="userCred">{user}</div>
      </div>
    );
  }
}

// $("#getIn, .close").on("click", function() {
//   console.log("clicked button");
//   $(".wrapper").toggleClass("is-blurred");
//   // blurToggle();
// });

ReactDOM.render(<Scripts />, document.getElementsByClassName("rets")[0]);

console.log(document.getElementsByClassName("rets"));

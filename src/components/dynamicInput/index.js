import React from "react";
import SkillList from "./inputCreate";

class DynamicList extends React.Component {
  state = {
    bookDetails: this.props.keyPoints,
  };
  handleChange = (e) => {
    if (["name"].includes(e.target.name)) {
      let bookDetails = [...this.state.bookDetails];
      bookDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    this.props.setkeyPoints(this.state.bookDetails);
  };
  addNewRow = (e) => {
    this.setState((prevState) => ({
      bookDetails: [
        ...prevState.bookDetails,
        {
          index: Math.random(),
          name: "",
        },
      ],
    }));
  };

  deteteRow = (index) => {
    this.props.setkeyPoints(
      this.state.bookDetails.filter((s, sindex) => index !== sindex)
    );
    this.setState({
      bookDetails: this.state.bookDetails.filter(
        (s, sindex) => index !== sindex
      ),
    });
    this.props.setkeyPoints(this.state.bookDetails);
  };

  clickOnDelete(record) {
    this.props.setkeyPoints(this.state.bookDetails.filter((r) => r !== record));
    this.setState({
      bookDetails: this.state.bookDetails.filter((r) => r !== record),
    });
  }
  render() {
    let { bookDetails } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1" />
            <div className="col-sm-10">
              <div className="container">
                <div className="row">
                  <SkillList
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    bookDetails={bookDetails}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
      </div>
    );
  }
}
export default DynamicList;

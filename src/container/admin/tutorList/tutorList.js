import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTutors } from "../../../redux/tutor/actionCreator";

export class tutorList extends Component {
  componentDidMount() {
    this.props.getAllTutors();
  }
  render() {
    return <div></div>;
  }
}
// const mapStateToProps = (state) => ({
//   songs: state.songs,
// });

const mapDispatchToProps = {
  getAllTutors,
};

export default connect(mapStateToProps, mapDispatchToProps)(tutorList);

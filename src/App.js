import React, { Component } from "react";
import styles from "./App.module.css";
import { connect } from "react-redux";
import { makeHttpRequestWithPage } from "./actions/index";
class App extends Component {
  componentDidMount() {
    this.props.makeHttpRequestWithPage(1);
  }

  render() {
    let users, renderPageNumbers;

    if (this.props.data.users !== null) {
      users = this.props.data.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.props.data.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.props.data.total / this.props.data.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes =
          this.props.data.current_page === number ? styles.active : "";

        if (
          number === 1 ||
          number === this.props.data.total ||
          (number >= this.props.data.current_page - 2 &&
            number <= this.props.data.current_page + 2)
        ) {
          return (
            <span
              key={number}
              className={classes}
              onClick={() => this.props.makeHttpRequestWithPage(number)}
            >
              {number}
            </span>
          );
        }
      });
    }

    return (
      <div className={styles.app}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>

        <div className={styles.pagination}>
          <div className={styles.pagination}>
            <span onClick={() => this.props.makeHttpRequestWithPage(1)}>
              &laquo;
            </span>
            {renderPageNumbers}
            <span onClick={() => this.props.makeHttpRequestWithPage(1)}>
              &raquo;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.rootReducers
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    makeHttpRequestWithPage: pageNumber => {
      dispatch(makeHttpRequestWithPage(pageNumber));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

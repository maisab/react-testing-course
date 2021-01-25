import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCategories, pickCategory } from "../actions";

export class App extends Component {
  componentDidMount() {
    if (this.props.categories.length === 0) {
      fetch("http://jservice.io/api/categories?count=20")
        .then((response) => response.json())
        .then((json) => this.props.setCategories(json));
    }
  }

  render() {
    return (
      <div>
        <h2>Pardys!</h2>
        {this.props.categories.map((category) => {
          return (
            <div key={category.id}>
              <Link
                to="/category"
                onClick={() => this.props.pickCategory(category)}
              >
                <h4>{category.title}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { setCategories, pickCategory })(App);

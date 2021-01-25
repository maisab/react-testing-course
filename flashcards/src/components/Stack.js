import React from "react";
import { connect } from "react-redux";
import Card from "./Card";

export const Stack = ({ stack: { title, cards } }) => {
  return (
    <div>
        <a className="link-home" href="/">
          <h4>Home</h4>
        </a>

      <h3>{title}</h3>
      <br />
      {cards.map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </div>
  );
};
export const mapStateToProps = (state) => ({
  stack: state.stack
});

export default connect(mapStateToProps, null)(Stack);

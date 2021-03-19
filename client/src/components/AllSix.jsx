import React from "react";
import "./AllSix.css";
import "../index.css";
import { Link } from "react-router-dom";

function AllSix(props) {
  const name = props.name;

  return (
    <section className="AllSix">
      <Link to="/Application" name={name}>
        <div className="graph Application">Application<br/>{props.name}</div>
      </Link>
      <Link to="/Consensus" name={name}>
        <div className="graph Consensus">Consensus<br/>{props.name}</div>
      </Link>
      <Link to="/Incentive" name={name}>
        <div className="graph Incentive">Incentive<br/>{props.name}</div>
      </Link>
      <Link to="/Operational" name={name}>
        <div className="graph Operational">Operational<br/>{props.name}</div>
      </Link>
      <Link to="/Network" name={name}>
        <div className="graph Network">Network<br/>{props.name}</div>
      </Link>
      <Link to="/Governance" name={name}>
        <div className="graph Governance">Governance<br/>{props.name}</div>
      </Link>
    </section>
  );
}

export default AllSix;

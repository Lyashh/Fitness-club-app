import React from "react";
import { Link } from "react-router-dom";
import { ProgramProps } from "../../types/props.types";
import { Col } from "react-bootstrap";

const Program = (props: ProgramProps) => {
  return (
    <Col md={4} className="program-list">
      <Link to={`/programs/${props.program.id}`} className="list-link">
        <div className="list-box">
          <div className="align-verical">
            <img className="program-icon" />
            <span>
              {props.countList}. {props.program.name}
            </span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default Program;

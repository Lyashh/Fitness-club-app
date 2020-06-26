import React from "react";
import { ProgramsListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";
import { Col, Button } from "react-bootstrap";

@inject("store")
@observer
class AvailableProgram extends React.Component<ProgramsListProps, {}> {
  assignProgram = async () => {
    try {
      await this.props.store?.currentUserStore.assignProgram(this.props.id);
    } catch (error) {
      console.log({ error });
    }
  };
  render() {
    return (
      <Col md={12} className="program-list">
        <div className="list-program-box">
          <span className="list-program-title">{this.props.name}</span>
          <img className="program-icon float-r" />
          <div>
            <Button
              variant="success"
              className="m-t-15"
              onClick={this.assignProgram}
            >
              Assign
            </Button>
          </div>
        </div>
      </Col>
    );
  }
}

export default AvailableProgram;

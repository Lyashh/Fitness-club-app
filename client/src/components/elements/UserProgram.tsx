import React from "react";
import { UserProgramListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";
import { Col, Button } from "react-bootstrap";

@inject("store")
@observer
class UserProgram extends React.Component<UserProgramListProps, {}> {
  unassignProgram = async () => {
    try {
      await this.props.store?.currentUserStore.unassignProgram(this.props.id);
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
              variant="danger"
              className="m-t-15"
              onClick={this.unassignProgram}
            >
              Unassign
            </Button>
          </div>
        </div>
      </Col>
    );
  }
}

export default UserProgram;

import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Program from "../elements/ProgramInList";
import { StoreAndRouterProps } from "../../types/props.types";

@inject("store")
@observer
class Programs extends React.Component<StoreAndRouterProps, {}> {
  componentDidMount() {
    this.setPrograms();
  }

  async setPrograms() {
    try {
      await this.props.store.programStore.setPrograms();
    } catch (error) {
      console.log(error);
      this.props.history.push("/login");
    }
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <h1>Your programs:</h1>
        {store.programStore.programs.length > 0 ? (
          store.programStore.programs.map((program, i) => {
            return <Program key={i} program={program}></Program>;
          })
        ) : (
          <p>You dont have programs</p>
        )}
      </div>
    );
  }
}

export default withRouter(Programs);

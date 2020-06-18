import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Root } from "../../mst/stores/rootStore";

import Program from "./Program";

interface ProgramsProps extends RouteComponentProps {
  store: Root;
}

interface ProgramsState {}

@inject("store")
@observer
class Programs extends React.Component<ProgramsProps, ProgramsState> {
  componentDidMount() {
    this.setPrograms();
  }

  async setPrograms() {
    try {
      await this.props.store.programStore.setPrograms();
    } catch (error) {
      console.log(error);
      //this.props.history.push("/login");
    }
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        {store.programStore.programs.length > 0 ? (
          store.programStore.programs.map((program, i) => {
            return <Program key={i} program={program}></Program>;
          })
        ) : (
          <p>You dont have programs</p>
        )}
        {}
      </div>
    );
  }
}

export default withRouter(Programs);

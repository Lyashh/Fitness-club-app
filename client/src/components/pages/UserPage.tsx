import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import { userByIdRequest } from "../../api/user.api";
import { UserPageState } from "../../types/state.types";
import UserProgram from "../elements/UserProgram";
import AvailableProgram from "../elements/AvailablePrograms";

@inject("store")
@observer
class UserPage extends React.Component<StoreRouterIdParam, {}> {
  constructor(props: StoreRouterIdParam) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.store.currentUserStore.clear();
      await this.props.store.programStore.clear();

      await this.props.store.currentUserStore.getUser(
        parseInt(this.props.match.params.id)
      );
      await this.props.store.programStore.setPrograms();
    } catch (error) {
      console.log({ error });
      if (error.code === 401) {
        this.props.history.push("/login");
      } else if (error.code === 404) {
        this.props.history.push("/notFound");
      } else if (error.code === 403) {
        this.props.history.push("/profile");
      }
    }
  }

  render() {
    const { user } = this.props.store.currentUserStore;
    const { programStore } = this.props.store;

    const userInfo = (
      <div>
        <h2>{user.name}</h2>
        <p>email: {user.email}</p>
      </div>
    );

    const userPrograms = (
      <div style={{ width: "50%" }}>
        {user.programs?.map((program, i) => {
          return <UserProgram key={i} name={program.name} id={program.id} />;
        })}
      </div>
    );

    const availablePrograms = (
      <div style={{ width: "50%" }}>
        {programStore.programsThatNotAssign().map((program, i) => {
          return (
            <AvailableProgram id={program.id} name={program.name} key={i} />
          );
        })}
      </div>
    );

    const main = (
      <div>
        {userInfo}
        <div style={{ width: "100%", display: "flex" }}>
          {userPrograms} {availablePrograms}
        </div>
      </div>
    );

    return <div>{user.id > 0 ? main : <p>Loading...</p>}</div>;
  }
}

export default withRouter(UserPage);

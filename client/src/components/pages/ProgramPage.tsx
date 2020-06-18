import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Root } from "../../mst/stores/rootStore";
import { getProgramById } from "../../api/programs";

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

interface PrPageProps extends MatchProps {
  store: Root;
}

interface PrPageState {
  name: string;
  id: number;
}

@inject("store")
@observer
class ProgramPage extends React.Component<PrPageProps, PrPageState> {
  constructor(props: PrPageProps) {
    super(props);
    this.state = {
      id: 0,
      name: "",
    };
  }
  async componentDidMount() {
    try {
      const program = await getProgramById(
        parseInt(this.props.match.params.id)
      );
      this.setState({ name: program.data.name, id: program.data.id });
    } catch (error) {
      if (error.response.status === 401) {
        this.props.history.push("/login");
      } else if (error.response.status === 404) {
        this.props.history.push("/notFound");
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.id ? (
          <div>
            <h3>{this.state.name}</h3>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(ProgramPage);

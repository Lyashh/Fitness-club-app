import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { LoginState } from "../../types/state.types";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { ValidationError } from "../../types/customError.types";
import joi from "@hapi/joi";

@inject("store")
@observer
class Login extends React.Component<StoreAndRouterProps, LoginState> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      generalError: "",
      errorView: false,
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  async validation() {
    try {
      const schema = joi.object({
        email: joi
          .string()
          .email({ tlds: { allow: false } })
          .required(),
        password: joi.string().min(8).max(30).required(),
      });
      await schema.validateAsync({
        email: this.state.email,
        password: this.state.password,
      });
    } catch (error) {
      if (error.toString().includes("email")) {
        throw new ValidationError(error.toString(), "emailError");
      } else if (error.toString().includes("password")) {
        throw new ValidationError(error.toString(), "passwordError");
      }
      throw new ValidationError(error, "generalError");
    }
  }

  login = async () => {
    try {
      await this.validation();
      await this.props.store.profileStore.setLogin(
        this.state.email,
        this.state.password
      );
      this.props.history.push("/profile");
    } catch (e) {
      if (e.code) {
        this.setState({
          passwordError: "",
          emailError: "",
          errorView: true,
          generalError: e.body,
        });
      } else if (e.field) {
        const newState = {
          [e.field]: e.body.toString(),
          errorView: true,
        } as Pick<LoginState, keyof LoginState>;
        this.setState(
          { emailError: "", passwordError: "", generalError: "" },
          () => {
            this.setState(newState);
          }
        );
      } else {
        console.log(e);
      }
    }
  };

  getProfile = async () => {
    try {
      await this.props.store.profileStore.setProfile();
      this.props.history.push("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center m-t-120">
          <Col md={6}>
            <h4 className="m-b-50">Sign In:</h4>
            <div>
              <p>Email:</p>
              <InputGroup className="edit-program-input">
                <FormControl
                  type="email"
                  className="mb-3 edit-program-input"
                  placeholder="Enter email"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.emailError}</p>
              ) : null}
            </div>

            <div>
              <p>Password:</p>
              <InputGroup className="edit-program-input">
                <FormControl
                  type="password"
                  className="mb-3 edit-program-input"
                  placeholder="Enter password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.passwordError}</p>
              ) : null}
            </div>
            {this.state.errorView ? (
              <p className="text-danger">{this.state.generalError}</p>
            ) : null}
            <p className="text-success">{this.props.location?.state}</p>
            <Button variant="primary" onClick={this.login}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);

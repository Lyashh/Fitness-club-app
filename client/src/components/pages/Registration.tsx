import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { RegistationState } from "../../types/state.types";
import { registrationRequest } from "../../api/auth.api";
import { ValidationError } from "../../types/customError.types";
import joi from "@hapi/joi";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

@inject("store")
@observer
class Registration extends React.Component<
  StoreAndRouterProps,
  RegistationState
> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: 0,
      ageError: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      generalError: "",
      errorView: false,
    };
  }

  componentDidMount() {
    if (this.props.store.profileStore.isAuth) {
      this.props.history.push("/profile");
    }
  }

  async clearErrors() {
    await this.setState({
      ageError: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      generalError: "",
    });
  }

  async validate() {
    try {
      const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        age: joi.number().integer().min(18).required().max(100),
        email: joi
          .string()
          .email({ tlds: { allow: false } })
          .min(5)
          .max(100)
          .required(),
        password: joi.string().min(8).max(30).required(),
        confirmPassword: joi
          .string()
          .min(8)
          .max(30)
          .required()
          .valid(joi.ref("password"))
          .error(
            (errors) =>
              new Error("Your password and confirmation password do not match")
          ),
      });
      await schema.validateAsync({
        name: this.state.name,
        age: this.state.age,
        confirmPassword: this.state.confirmPassword,
        email: this.state.email,
        password: this.state.password,
      });
    } catch (error) {
      if (error.toString().includes("email")) {
        throw new ValidationError(error.toString(), "emailError");
      } else if (error.toString().includes("password" || "confirmPassword")) {
        throw new ValidationError(error.toString(), "passwordError");
      } else if (error.toString().includes("age")) {
        throw new ValidationError(error.toString(), "ageError");
      } else if (error.toString().includes("name")) {
        throw new ValidationError(error.toString(), "nameError");
      }
      throw new ValidationError(error, "generalError");
    }
  }

  handleInputs = (e: { target: { name: any; value: any } }) => {
    const newState = { [e.target.name]: e.target.value } as Pick<
      RegistationState,
      keyof RegistationState
    >;
    this.setState(newState);
  };

  registration = async () => {
    try {
      await this.validate();
      await registrationRequest({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        age: this.state.age,
      });
      this.props.history.push({
        pathname: "/login",
        state: `Now you can sign in with email: ${this.state.email}`,
      });
    } catch (e) {
      if (e.response) {
        await this.clearErrors();
        this.setState({
          errorView: true,
          generalError: e.response.data.message,
        });
      } else if (e.field) {
        const newState = {
          [e.field]: e.body.toString(),
          errorView: true,
        } as Pick<RegistationState, keyof RegistationState>;
        await this.clearErrors();
        this.setState(newState);
      } else {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center m-t-120">
          <Col md={12}>
            <h4 className="m-b-50">Sign Out:</h4>
          </Col>

          <Col md={6}>
            <div>
              <p>Name:</p>
              <InputGroup className="input-wrap">
                <FormControl
                  name="name"
                  type="text"
                  className="mb-3"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.handleInputs}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.nameError}</p>
              ) : null}
            </div>
            <div>
              <p>Email:</p>
              <InputGroup className="input-wrap">
                <FormControl
                  name="email"
                  type="text"
                  className="mb-3"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputs}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.emailError}</p>
              ) : null}
            </div>
            <div>
              <p>Age:</p>
              <InputGroup className="input-wrap">
                <FormControl
                  name="age"
                  type="number"
                  className="mb-3"
                  placeholder="Enter age"
                  value={this.state.age}
                  onChange={this.handleInputs}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.ageError}</p>
              ) : null}
            </div>
          </Col>
          <Col md={6}>
            <div>
              <p>Password:</p>
              <InputGroup className="input-wrap">
                <FormControl
                  name="password"
                  type="password"
                  className="mb-3"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputs}
                />
              </InputGroup>
            </div>
            <div>
              <p>Confirm password:</p>
              <InputGroup className="input-wrap">
                <FormControl
                  name="confirmPassword"
                  type="password"
                  className="mb-3"
                  placeholder="Enter password again"
                  value={this.state.confirmPassword}
                  onChange={this.handleInputs}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.passwordError}</p>
              ) : null}
            </div>
            <div>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.generalError}</p>
              ) : null}
            </div>
            <Button variant="primary" onClick={this.registration}>
              Sign Out
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Registration);

import { UserModel } from "../models/user";
import { ProgramModel } from "../models/program";
import { ExirciseModel } from "../models/exercise";

export interface LoginState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  errorView: boolean;
  generalError: string;
}

export interface EditProgramState {
  newName: string;
  errorBody: string;
  errorView: boolean;
  successBody: string;
  successView: boolean;
}

export interface RegistationState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  errorMessage: string;
  errorCode: number;
}

export interface UserPageState {
  id: number;
  age: number;
  name: string;
  email: string;
  programs: ProgramModel[];
}

export interface EditProgram {
  name: string;
  id: number;
  exercises: ExirciseModel[];
  newName: string;
}

export interface CreateProgramState {
  name: string;
  errorBody: string;
  errorView: boolean;
}

export interface PrPageState {
  name: string;
  id: number;
  exercises: ExirciseModel[];
}

export interface DeleteExerciseState {
  checked: boolean;
}

export interface AthletesState {
  users: UserModel[];
}

export interface NavbarState {
  authGeneralNavs: Array<{
    name: string;
    link: string;
    coach: boolean;
  }>;
}

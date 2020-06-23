import { UserModel } from "./../mst/models/user";
import { ProgramModel } from "./../mst/models/program";
import { ExirciseModel } from "./../mst/models/exercise";

export interface LoginState {
  email: string;
  password: string;
  errorMessage: string;
  errorCode: number;
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

export interface EditProgramState {
  name: string;
  id: number;
  exercises: ExirciseModel[];
  newName: string;
}

export interface CreateProgramState {
  name: string;
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

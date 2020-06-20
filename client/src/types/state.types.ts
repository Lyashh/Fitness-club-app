import { ExirciseModel } from "./../mst/models/exercise";

export interface LoginState {
  email: string;
  password: string;
  errorMessage: string;
  errorCode: number;
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

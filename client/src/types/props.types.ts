import { ProgramModel } from "../models/program";
import { RouteComponentProps } from "react-router-dom";
import { Root } from "../stores/rootStore";

interface RouterWithIdParam
  extends RouteComponentProps<{
    id: string;
  }> {}

export interface ExerciseFields {
  name: string;
  id: number;
  category: string;
  quantity: number;
}

export interface UserProgramListProps {
  name: string;
  id: number;
  store?: Root;
}

export interface ProgramsListProps {
  name: string;
  id: number;
  store?: Root;
}

export interface NavbarProps extends RouteComponentProps {
  store?: Root;
}

export interface StoreAndRouterProps
  extends RouteComponentProps<{ detail: string }> {
  store: Root;
}

export interface StoreRouterIdParam extends RouterWithIdParam {
  store: Root;
}

export interface ProgramProps {
  countList: number;
  program: ProgramModel;
}

export interface ExerciseListProps extends ExerciseFields {
  store?: Root;
}

import { ProgramModel } from "./../mst/models/program";
import { RouteComponentProps } from "react-router-dom";
import { Root } from "../mst/stores/rootStore";

interface RouterWithIdParam
  extends RouteComponentProps<{
    id: string;
  }> {}

export interface ExerciseListProps {
  name: string;
  id: number;
  category: string;
}

export interface NavbarProps extends RouteComponentProps {
  store?: Root;
}

export interface StoreAndRouterProps extends RouteComponentProps {
  store: Root;
}

export interface StoreRouterIdParam extends RouterWithIdParam {
  store: Root;
}

export interface ProgramProps {
  program: ProgramModel;
}
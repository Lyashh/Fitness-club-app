export interface editProgram {
  id: number;
  newFields: {
    name: string;
  };
}

export interface registrationBody {
  name: string;
  age: number;
  email: string;
  password: string;
  roleId?: number;
}

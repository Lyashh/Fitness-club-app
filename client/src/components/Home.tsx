import React from 'react';

interface IProps {
}

interface IState {
  email: string,
  password: string
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps ) {
      super(props)
      this.state = {
        email: "",
        password: ""
      }
  }

 render() {
   return(
    <div>

    </div>
   )
 }
}

export default Home;

import React from "react";
import { Routes } from "./routes";

interface PropsType {}
interface StateType {
  user?: any;
}
class App extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const { user } = this.state;
    return (
      <div className="app">
        <Routes user={user} />
      </div>
    );
  }
}

export default App;

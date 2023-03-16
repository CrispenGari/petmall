import React from "react";
import Routes from "./routes";

interface PropsType {}
interface StateType {}
class App extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    );
  }
}

export default App;

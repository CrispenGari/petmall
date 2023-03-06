import React from "react";
import "./Banner.css";

const banners = [
  `/static/0.jpg`,
  `/static/1.jpg`,
  `/static/2.jpg`,
  `/static/3.jpg`,
];
interface PropsType {}
interface StateType {
  index: number;
}
class Banner extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  intervalId: any;
  componentDidMount(): void {
    this.intervalId = setInterval(() => {
      const { index } = this.state;
      if (index < banners.length - 1) {
        this.setState((state) => ({
          ...state,
          index: index + 1,
        }));
      } else {
        this.setState((state) => ({
          ...state,
          index: 0,
        }));
      }
    }, 5000);
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalId);
  }
  render() {
    const {
      state: { index },
    } = this;
    return (
      <div
        className="banner"
        style={{ backgroundImage: `url(${banners[index]})` }}
      >
        <h1>Welcome to PetMall, where you can explore, buy and sell Pets.</h1>
      </div>
    );
  }
}

export default Banner;

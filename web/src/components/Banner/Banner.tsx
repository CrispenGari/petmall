import React from "react";
import "./Banner.css";

const banners = [
  `/static/0.jpg`,
  `/static/1.jpg`,
  `/static/2.jpg`,
  `/static/3.jpg`,
  `/static/4.webp`,
  `/static/5.jpg`,
  `/static/6.jpg`,
  `/static/7.jpg`,
  `/static/8.jpg`,
  `/static/9.webp`,
  `/static/10.webp`,
  `/static/11.jpg`,
  `/static/12.jpg`,
  `/static/13.jpg`,
  `/static/14.webp`,
  `/static/15.jpg`,
  `/static/16.jpg`,
].sort((_) => Math.random() - 0.5);
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
        <h1>Welcome to PetMall.</h1>
        <p>
          Pet marketing made easy for you. Buy and sell pets using our
          application.
        </p>
      </div>
    );
  }
}

export default Banner;

import React from "react";
import { Icon } from "semantic-ui-react";
import { withGlobalProps } from "../../hoc";
import "./HeaderButton.css";

interface PropsType {
  iconName: string;
  title: string;
  onClick: () => void;
  notification?: boolean;
}
interface StateType {}
class HeaderButton extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      props: { iconName, title, onClick, notification },
    } = this;
    return (
      <div title={title} className="header__button" onClick={onClick}>
        {!!notification && <div className="header__button__dot" />}
        <Icon name={iconName as any} className="header__button__icon" />
        <p>{title}</p>
      </div>
    );
  }
}

export default withGlobalProps(HeaderButton);

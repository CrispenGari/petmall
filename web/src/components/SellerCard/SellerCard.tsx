import React from "react";
import { UserType } from "../../graphql/generated/graphql";
import "./SellerCard.css";
interface PropsType {
  seller: UserType;
}
interface StateType {}
class SellerCard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const { seller } = this.props;
    return (
      <div className="seller__card">
        <div className="seller__card__top">
          <div className="seller__card__top__left">
            <h1>Steve Sanders</h1>
            <p>{seller.email}</p>
          </div>{" "}
          <img
            alt="profile"
            src={!!seller?.avatar ? seller.avatar : "/profile.png"}
          />
          <div className="seller__card__bottom"></div>
        </div>
      </div>
    );
  }
}

export default SellerCard;

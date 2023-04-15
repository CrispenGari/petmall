import React from "react";
import { UserType } from "../../graphql/generated/graphql";
import { withGlobalProps } from "../../hoc";
import { GlobalPropsType } from "../../types";
import { encodeId } from "../../utils";
import "./SellerCard.css";
interface PropsType {
  seller: UserType;
  globalProps: GlobalPropsType;
}
interface StateType {}
class SellerCard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      seller,
      globalProps: { navigate },
    } = this.props;
    return (
      <div className="seller__card">
        <div className="seller__card__top">
          <div className="seller__card__top__left">
            <h1 onClick={() => navigate(`/app/profile/${encodeId(seller.id)}`)}>
              {seller.firstName} {seller.lastName}
            </h1>
            <p onClick={() => navigate(`/app/profile/${encodeId(seller.id)}`)}>
              {seller.email}
            </p>
          </div>{" "}
          <img
            onClick={() => navigate(`/app/profile/${encodeId(seller.id)}`)}
            alt="profile"
            src={!!seller?.avatar ? seller.avatar : "/profile.png"}
          />
        </div>
      </div>
    );
  }
}

export default withGlobalProps(SellerCard);

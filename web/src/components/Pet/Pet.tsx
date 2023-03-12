import React from "react";
import { PetType } from "../../graphql/generated/graphql";
import "./Pet.css";
import CountUp from "react-countup";
import { Icon, Image } from "semantic-ui-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { relativeTimeObject } from "../../constants";
import { withGlobalProps } from "../../hoc";
import { GlobalPropsType } from "../../types";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface StateType {}
interface PropsType {
  pet: PetType;
  globalProps: GlobalPropsType;
}
class Pet extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      pet,
      globalProps: { navigate },
    } = this.props;
    console.log({ pet });
    const repliesCount: number =
      pet.comments
        ?.map((cmt) => cmt.replies?.length || 0)
        .reduce((a, b) => a + b, 0) || 0;
    const commentCount: number = pet.comments?.length || 0;
    return (
      <div className="pet" onClick={() => navigate(`/app/pet/${pet.id}`)}>
        <h1>{pet.name}</h1>
        <p>
          {pet.age} weeks • {pet.gender.toLowerCase()}
        </p>
        <img alt={pet.name} src={pet.image} />
        <div className="pet__details">
          <CountUp
            start={0}
            end={pet.price}
            duration={1}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
            className="pet__details__price"
          />
          <div className="pet__details__stats">
            <p>
              <Icon name="like" />
              <span>{pet.reactions?.length ?? 0} reactions</span>
            </p>
            <p>
              <Icon name="comments" />
              <span>{repliesCount + commentCount} comments</span>
            </p>
          </div>
          <div className="pet__details__seller">
            <Image
              src="/profile.png"
              size="small"
              title={pet.seller?.email}
              circular
              className="pet__details__seller__avatar"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withGlobalProps(Pet);

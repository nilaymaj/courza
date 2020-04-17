import * as React from 'react';
import CardHeader from './header';
import CardFooter from './footer';
import Text from '../text';

const Card = (props) => {
  if (props.filler)
    return (
      <div className="cz-card__filler">
        <Text note medium>
          {props.text}
        </Text>
      </div>
    );
  return <div className="cz-card__wrapper">{props.children}</div>;
};

export default Card;
export { CardHeader, CardFooter };

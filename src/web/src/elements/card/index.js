import React from 'react';
import CardHeader from './header';
import CardFooter from './footer';

const Card = props => {
  return <div className="cz-card__wrapper">{props.children}</div>;
};

export default Card;
export { CardHeader, CardFooter };

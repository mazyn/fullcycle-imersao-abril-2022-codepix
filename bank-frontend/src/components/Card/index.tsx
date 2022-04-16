import React, { PropsWithChildren } from 'react';

import classes from './Card.module.scss';

const Card: React.FC<PropsWithChildren<any>> = (props) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default Card;

import React, { PropsWithChildren } from 'react';
import classes from './MainContent.module.scss';

const MainContent: React.FC<PropsWithChildren<any>> = (props) => (
  <main className={classes.root}>
    <div className="container">{props.children}</div>
  </main>
);

export default MainContent;

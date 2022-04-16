import { PropsWithChildren } from 'react';
import classes from './Title.module.scss';

const Title: React.FC<PropsWithChildren<any>> = (props) => (
  <h1 className={classes.root}>{props.children}</h1>
);

export default Title;

import React, { PropsWithChildren } from 'react';

import classes from './FormButtonActions.module.scss';

const FormButtonActions: React.FC<PropsWithChildren<any>> = (props) => {
  return <div className={`${classes.root} mt-4`}>{props.children}</div>;
};

export default FormButtonActions;

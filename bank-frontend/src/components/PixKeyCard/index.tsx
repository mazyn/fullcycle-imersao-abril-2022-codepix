import React from 'react';

import classes from './PixKeyCard.module.scss';
import { PixKeyModel } from '../../models/pix-key.model';

interface PixKeyCardProps {
  pixKey: PixKeyModel;
}

const pixKeyKinds = {
  cpf: 'CPF',
  email: 'E-mail',
};

const PixKeyCard: React.FC<PixKeyCardProps> = ({ pixKey }) => {
  // const bank = React.useContext(BankContext);
  return (
    <div className={`${classes.root} ${classes.bankNLB}`}>
      <p className={classes.kind}>{pixKeyKinds[pixKey.kind]}</p>
      <span className={classes.key}>{pixKey.key}</span>
    </div>
  );
};

export default PixKeyCard;

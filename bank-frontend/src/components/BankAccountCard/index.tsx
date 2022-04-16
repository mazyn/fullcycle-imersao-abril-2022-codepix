import React from 'react';
import classes from './BankAccountCard.module.scss';
import { BankAccountModel } from '../../models/bank-account.model';

interface BankAccountCardProps {
  bankAccount: BankAccountModel;
}

const BankAccountCard: React.FC<BankAccountCardProps> = (props) => {
  const { bankAccount } = props;

  return (
    <article className={`${classes.root} ${classes.bankNLB}`}>
      <div>
        <h2 className={classes.ownerName}>{bankAccount.owner_name}</h2>
        <p className={`${classes.accountNumber} ${classes.bankNLB}`}>
          {bankAccount.account_number}
        </p>
      </div>
      <span
        className={`fas fa-chevron-right ${classes.iconRight} ${classes.bankNLB}`}
      />
    </article>
  );
};

export default BankAccountCard;

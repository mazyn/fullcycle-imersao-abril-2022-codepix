import React from 'react';

import classes from './BankAccountBalance.module.scss';

interface BankAccountBalanceProps {
  balance: number;
}

const BankAccountBalance: React.FC<BankAccountBalanceProps> = (props) => {
  const { balance } = props;
  return (
    <div className={`${classes.root} ${classes.bankNLB}`}>
      <h2>
        Saldo em conta corrente{' '}
        <span>R$ {balance.toLocaleString('pt-BR')}</span>
      </h2>
    </div>
  );
};

export default BankAccountBalance;

import React from 'react';
import Link from 'next/link';

import classes from './Navbar.module.scss';
import { BankAccountModel } from '../../models/bank-account.model';

interface NavbarProps {
  bankAccount?: BankAccountModel;
}

const Navbar: React.FC<NavbarProps> = ({ bankAccount }) => (
  <nav className={`navbar navbar-expand-lg ${classes.root} ${classes.bankNLB}`}>
    <div className={`container-fluid ${classes.navbarBody}`}>
      <Link href="/bank-accounts" as="/bank-accounts">
        <a className={`navbar-brand ${classes.navbarBrand}`}>
          <img
            src="/img/icon_banco.png"
            alt="The Bank logo"
            className={classes.logoBank}
          />
          <div className={classes.bankName}>
            <span>Cod - NLB</span>
            <h2>NilBank</h2>
          </div>
        </a>
      </Link>
      {bankAccount && (
        <div
          className={`collapse navbar-collapse justify-content-end ${classes.navbarRightRoot}`}
          id="navbarSupportedContent"
        >
          <ul className={`navbar-nav ${classes.navbarRightBody}`}>
            <li className={`nav-item ${classes.bankAccountInfo}`}>
              <img
                src="/img/icon_user.png"
                alt="User icon"
                className={classes.iconUser}
              />
              <p className={classes.ownerName}>
                {bankAccount.owner_name} | C/C: {bankAccount.account_number}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  </nav>
);

export default Navbar;

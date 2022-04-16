import React, { PropsWithChildren } from 'react';

import Footer from './Footer';
import MainContent from './MainContent';
import Navbar from './Navbar';
import { BankAccountModel } from '../models/bank-account.model';

interface LayoutProps {
  bankAccount?: BankAccountModel;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <>
      <Navbar bankAccount={props.bankAccount} />
      <MainContent>{props.children}</MainContent>
      <Footer />
    </>
  );
};

export default Layout;

import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import BankAccountCard from '../../components/BankAccountCard';
import { BankAccountModel } from '../../models/bank-account.model';
import { bankHttp } from '../../util/http';

type BankAccountProps = {
  bankAccounts: BankAccountModel[];
};

const BankAccounts: NextPage<BankAccountProps> = (props) => {
  const { bankAccounts } = props;

  return (
    <Layout>
      <Title>Contas bancárias</Title>
      <div className="row">
        {bankAccounts.map((b, key) => (
          <Link
            key={key}
            href="/bank-accounts/[id]"
            as={`/bank-accounts/${b.id}`}
          >
            <a className="col-12 col-sm-6 col-md-4">
              <BankAccountCard bankAccount={b} />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default BankAccounts;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: bankAccounts } = await bankHttp.get('bank-accounts');
  return {
    props: {
      bankAccounts,
    },
  };
};

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import Button from '../../../../../components/Button';
import Card from '../../../../../components/Card';
import Input from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import FormButtonActions from '../../../../../components/FormButtonActions';
import Layout from '../../../../../components/Layout';
import Title from '../../../../../components/Title';
import { bankHttp } from '../../../../../util/http';
import Modal from '../../../../../util/modal';
import { BankAccountModel } from '../../../../../models/bank-account.model';

interface TransactionRegisterProps {
  bankAccount: BankAccountModel;
}

const TransactionRegister: NextPage<TransactionRegisterProps> = (props) => {
  const { bankAccount } = props;
  const { register, handleSubmit } = useForm();
  const {
    query: { id },
    push,
  } = useRouter();

  async function onSubmit(data: any) {
    try {
      await bankHttp.post(`bank-accounts/${id}/transactions`, {
        ...data,
        amount: Number(data.amount),
      });
      await Modal.fire({
        title: 'Transação realizada com sucesso',
        icon: 'success',
      });
      await push(`/bank-accounts/${id}`);
    } catch (e) {
      console.error(e);
      await Modal.fire({
        title: 'Ocorreu um erro, tente novamente mais tarde',
        icon: 'error',
      });
    }
  }

  return (
    <Layout bankAccount={bankAccount}>
      <Title>Realizar transferência</Title>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm-4">
              <Select
                labelText="Tipo"
                {...register('pix_key_kind', { required: true })}
              >
                <option value="cpf">CPF</option>
                <option value="email">E-mail</option>
              </Select>
            </div>
            <div className="col-sm-8">
              <Input
                labelText="Chave"
                {...register('pix_key_key', { required: true })}
              />
            </div>
          </div>
          <Input
            {...register('amount', { required: true })}
            type="number"
            step=".01"
            labelText="Valor"
            defaultValue="0.00"
          />
          <Input {...register('description')} labelText="Descrição" />
          <FormButtonActions>
            <Link href="/bank-accounts/[id]" as={`/bank-accounts/${id}`}>
              <Button type="button" variant="info">
                Voltar
              </Button>
            </Link>
            <Button type="submit">Cadastrar</Button>
          </FormButtonActions>
        </form>
      </Card>
    </Layout>
  );
};

export default TransactionRegister;

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const {
    query: { id },
  } = cxt;
  const { data: bankAccount } = await bankHttp.get(`bank-accounts/${id}`);

  return {
    props: {
      bankAccount,
    },
  };
};

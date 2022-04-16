import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import classes from './PixRegister.module.scss';
import Layout from '../../../../components/Layout';
import Title from '../../../../components/Title';
import Card from '../../../../components/Card';
import PixKeyCard from '../../../../components/PixKeyCard';
import { PixKeyModel } from '../../../../models/pix-key.model';
import { bankHttp } from '../../../../util/http';
import Input from '../../../../components/Input';
import FormButtonActions from '../../../../components/FormButtonActions';
import Button from '../../../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Modal from '../../../../util/modal';
import { BankAccountModel } from '../../../../models/bank-account.model';

interface PixRegisterProps {
  pixKeys: PixKeyModel[];
  bankAccount: BankAccountModel;
}

const PixRegister: NextPage<PixRegisterProps> = ({ pixKeys, bankAccount }) => {
  const {
    query: { id },
    push,
  } = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await bankHttp.post(`pix-keys/${id}`, data);
      await Modal.fire({
        title: 'Chave cadastrada com successo',
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
  };

  return (
    <Layout bankAccount={bankAccount}>
      <div className="row">
        <div className="col-sm-6">
          <Title>Cadastrar chave Pix</Title>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={classes.kindInfo}>Escolha um tipo de chave</p>
              <Input
                {...register('kind', { required: true })}
                type="radio"
                labelText="CPF"
                value="cpf"
              />
              <Input
                {...register('kind', { required: true })}
                type="radio"
                labelText="E-mail"
                value="email"
              />
              <Input
                {...register('key', { required: true })}
                labelText="Digite a chave"
              />
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
        </div>
        <div className="col-sm-4 offset-md-2">
          <Title>Minhas chaves Pix</Title>
          {pixKeys.map((p, key) => (
            <PixKeyCard key={key} pixKey={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PixRegister;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
  const [{ data: pixKeys }, { data: bankAccount }] = await Promise.all([
    await bankHttp.get(`pix-keys/${id}`),
    await bankHttp.get(`bank-accounts/${id}`),
  ]);

  return {
    props: { pixKeys, bankAccount },
  };
};

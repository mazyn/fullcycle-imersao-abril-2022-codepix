package model_test

import (
	"github.com/mazyn/fullcycle-imersao-abril-2022-codepix/domain/model"
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestModel_NewAccount(t *testing.T) {
	code := "001"
	name := "Banco do Brasil"
	bank, err := model.NewBank(code, name)

	accountNumber := "abcnumber"
	ownerName := "Itadori Yuji"
	account, err := model.NewAccount(bank, accountNumber, ownerName)

	require.Nil(t, err)
	require.NotEmptyf(t, uuid.FromStringOrNil(account.ID), "")
	require.Equal(t, account.Number, accountNumber)
	require.Equal(t, account.BankID, bank.ID)

	_, err = model.NewAccount(bank, "", ownerName)
	require.NotNil(t, err)
}

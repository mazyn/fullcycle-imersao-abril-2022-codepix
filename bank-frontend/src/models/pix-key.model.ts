export interface PixKeyModel {
  id: string;
  kind: PixKeyKind;
  key: string;
}

export enum PixKeyKind {
  Cpf = 'cpf',
  Email = 'email',
}

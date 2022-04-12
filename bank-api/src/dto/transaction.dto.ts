import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PixKeyKind } from '../models/pix-key.model';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  pix_key_key: string;

  @IsString()
  @IsNotEmpty()
  pix_key_kind: PixKeyKind;

  @IsString()
  @IsOptional()
  description: string = null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsNotEmpty()
  readonly amount: number;
}

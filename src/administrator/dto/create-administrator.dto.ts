import { IsString } from 'class-validator';

export class CreateAdministratorDto {
  @IsString()
  readonly pesel: string;
}

// administrator.service.ts
import { Injectable } from '@nestjs/common';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private adminRepository: Repository<Administrator>,
    private userService: UsersService,
  ) {}

  async create(
    createAdministratorDto: CreateAdministratorDto,
  ): Promise<Administrator> {
    const { pesel } = createAdministratorDto;

    const user = await this.userService.findOne(pesel);

    const admin = this.adminRepository.create({ user });
    return this.adminRepository.save(admin);
  }

  async findOneWithUser(user: User): Promise<Administrator | undefined> {
    return this.adminRepository.findOne({ where: { user } });
  }
}

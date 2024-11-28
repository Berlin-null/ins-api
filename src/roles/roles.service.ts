import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    await this.checkIfRoleExists(createRoleDto.name);
    return this.prismaService.role.create({ data: createRoleDto });
  }

  findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    return this.getRole(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.getRole(id);
    await this.checkIfRoleExists(updateRoleDto.name, id);
    return this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    const existrole = await this.prismaService.role.findFirst({
      where: { id },
    });
    if (!existrole) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return `This action removes a #${id} role`;
  }

  private async getRole(id: number) {
    const existrole = await this.prismaService.role.findFirst({
      where: { id },
    });
    if (!existrole) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return existrole;
  }

  private async checkIfRoleExists(name: string, id?: number) {
    const doesRoleExist = await this.prismaService.role.findFirst({
      where: { name },
    });

    if (doesRoleExist) {
      if (id && doesRoleExist.id !== id) {
        throw new BadRequestException(`role ${name} already exist`);
      } else if (!id) {
        throw new BadRequestException(`role ${name} already exist`);
      }
    }
  }
}

// if (id && doesRoleExist?.id == id){
//   throw new BadRequestException(`role ${name} already exist`);
// }
// else if(doesRoleExist){
//   throw new BadRequestException(`role ${name} already exist`);
// }

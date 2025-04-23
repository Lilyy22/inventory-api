import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dto/SignupDto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('user not found in our db.');
    }
  }

  async findById(id: string): Promise<any> {
    const user = await this.prismaService.user.findById({
      where: { id: id },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('user not found in our db.');
    }
  }

  async create(userdetail: SignupDto): Promise<any> {
    try {
      const user = await this.prismaService.user.create({
        data: userdetail,
        select: {
          id: true,
          role: true,
          email: true,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }
}

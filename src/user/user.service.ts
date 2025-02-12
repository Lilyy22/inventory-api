import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
      throw new NotFoundException('credentials not found in our db.');
    }
  }

  async create(email: string, password: string): Promise<any> {
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await this.prismaService.user.create({
        data: {
          email: email,
          password: hashedPass,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import UserRoleEnum from 'src/users/enums/userRoleEnum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    mobile: string,
    password: string,
    display_name: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      mobile,
      password: hashedPassword,
      display_name,
      role: UserRoleEnum.NormalUser,
    });
  }

  async login(
    mobile: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.userService.findOneByMobile(mobile);
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid Password');

    const payload = {
      mobile: user.mobile,
      sub: user.id,
      display_name: user.display_name,
    };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}

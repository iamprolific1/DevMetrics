import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createPreference')
  async createUserPreference(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return await this.userService.saveUserPreferenceData(request, response);
  }
}

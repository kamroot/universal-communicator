import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('/v1/login')
  // getToken( @Body() userInfo: UserInfoDTO ): Promise<UserEntity> {
  //   return this.appService.getToken(userInfo);
  // }
}

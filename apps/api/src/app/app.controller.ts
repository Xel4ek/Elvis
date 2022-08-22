import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';

import { AppService } from './app.service';

@Controller({path: '/devices'})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Put()
  updateDevice(@Body() device) {
    return this.appService.updateDevice(device);
  }
  @Post()
  saveData(@Body() device) {
    return this.appService.saveData(device)
  }
  @Delete()
  removeData(@Body() id: number){
    return this.appService.removeData(id);
  }
}

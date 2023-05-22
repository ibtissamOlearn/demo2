import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {GlobalLogsService} from './globalLogs.service';
import {HttpClientModule} from '@angular/common/http';
import {LoggerService} from './logger-servive';
import {SftpService} from './sftp-service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, HttpClientModule],
  exports: [
    HomeComponent
  ],
  providers: [GlobalLogsService, LoggerService, SftpService]
})
export class HomeModule {}

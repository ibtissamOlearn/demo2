import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {GlobalLogsService} from './globalLogs.service';
import {HttpClientModule} from '@angular/common/http';
import {LoggerService} from './apiServices/logger-servive';
import {SftpService} from './apiServices/sftp-service';
import {CmdShellService} from './apiServices/cmd-shell-service';
import {ApiService} from './apiServices/api-service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, HttpClientModule],
  exports: [
    HomeComponent
  ],
  providers: [GlobalLogsService, LoggerService, SftpService, CmdShellService, ApiService]
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './components/status/status.component';
// import { EditUserComponent } from './components/edit-user/edit-user.component';
// import { MatDialogModule } from '@angular/material';
import { ModalComponent } from './components/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material';
// import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@NgModule({
  declarations: [StatusComponent, ModalComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    NgxPaginationModule,
    MatDialogModule,
  ],
  providers: [],
})
export class StatusModule {}

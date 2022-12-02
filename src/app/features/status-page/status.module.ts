import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './components/status/status.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
// import { MatDialogModule } from '@angular/material';
// import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [StatusComponent, EditUserComponent],
  imports: [CommonModule, StatusRoutingModule],
})
export class StatusModule {}

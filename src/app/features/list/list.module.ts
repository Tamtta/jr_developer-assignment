import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { TableContentComponent } from './components/table-content/table-content.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TheadComponent } from './components/thead/thead.component';

@NgModule({
  declarations: [TableContentComponent, UserListComponent, AddUserComponent, TheadComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ListModule {}

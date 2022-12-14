import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { TableContentComponent } from './components/table-content/table-content.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TheadComponent } from './components/thead/thead.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
// import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    TableContentComponent,
    UserListComponent,
    AddUserComponent,
    TheadComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class ListModule {}

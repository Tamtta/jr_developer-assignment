import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './components/edit/edit.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [CategoryComponent, ModalComponent, EditComponent, AddUserComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxPaginationModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CategoryModule {}

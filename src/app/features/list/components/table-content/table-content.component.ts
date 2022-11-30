import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss'],
})
export class TableContentComponent implements OnInit {
  @Input() mail!: string;
  @Input() persNumber!: string;
  @Input() name!: string;
  @Input() surname!: string;
  @Input() birthday!: string;
  @Input() category!: string;
  @Input() status!: string;
  @Output('delete') dltEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('edit') editEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.dltEvent.emit();
  }

  edit() {
    this.editEvent.emit();
  }
}

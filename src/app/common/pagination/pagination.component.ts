import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() pageChangeEvent = new EventEmitter<any>();

  maxSize = 5;
  rotate = true;
  ellipses = true;
  boundaryLinks = true;
  @Input() collectionSize= 120;
  @Input() page = 1;
  @Input() pageSize = 20;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(e) {
    this.pageChangeEvent.emit(e)
  }

}

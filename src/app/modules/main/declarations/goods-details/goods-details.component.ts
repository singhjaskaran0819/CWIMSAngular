import { Component, OnInit } from '@angular/core';
import { MODAL_SIZE } from 'src/app/common/constants';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RejectComponent } from '../reject/reject.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {

  itemId = null;
  items = [1];
  selectAll = false;

  constructor(private declarationsService: DeclarationsService, private modalService: ModalService) { }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclarationsService } from 'src/app/core/services/declarations.service';

@Component({
  selector: 'app-goods-received',
  templateUrl: './goods-received.component.html',
  styleUrls: ['./goods-received.component.scss']
})
export class GoodsReceivedComponent implements OnInit {

  constructor(private router: Router, private declarationsService: DeclarationsService) { }

  ngOnInit(): void {
  }

}

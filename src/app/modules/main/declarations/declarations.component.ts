import { Component, OnInit } from '@angular/core';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})
export class DeclarationsComponent implements OnInit {

  constructor(private declarationsService: DeclarationsService) { }
  goodsDetails = false;

  ngOnInit(): void {
  }

}

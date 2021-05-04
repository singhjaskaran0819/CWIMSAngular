import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-items',
  templateUrl: './upload-items.component.html',
  styleUrls: ['./upload-items.component.scss']
})
export class UploadItemsComponent implements OnInit {

  fileUploadForm;
  allowedFormats = ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  details;
  fileName;
  docTypeWrong = false;
  rackedItems;

  constructor(private http: HttpClient, private declarationService: DeclarationsService, private modalService: ModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.details)
    this.fileUploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelect(event) {
    this.fileName = "";
    this.docTypeWrong = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      let formData = new FormData();
      formData.append("file", file);

      if (!this.rackedItems) {
        this.declarationService.uploadRackedItemsFile(formData, this.details.id).subscribe(res => {
          this.declarationService.changeSadUploadedItems(true);
          this.modalService.closeModal();

        })
      } else {
        // this.declarationService.uploadRackedItemsFile(formData, this.details.id).subscribe(res => {
        //   this.declarationService.changeSadUploadedItems(true);
        //   this.modalService.closeModal();

        // })
      }

    }
  }
  cancel() {
    this.modalService.closeModal();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalesService } from 'src/app/core/services/sales.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-upload-sale',
  templateUrl: './upload-sale.component.html',
  styleUrls: ['./upload-sale.component.scss']
})
export class UploadSaleComponent implements OnInit {

  fileUploadForm;
  details;
  fileName;
  docTypeWrong = false;

  public files: NgxFileDropEntry[] = [];

  constructor(private http: HttpClient, private salesService: SalesService, private modalService: ModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  uploadFile(event) {
    this.fileName = "";
    this.docTypeWrong = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      let formData = new FormData();
      formData.append("file", file);
      // this.salesService.uploadFile(formData, this.details.id).subscribe(res => {
      //   this.salesService.changeSalesUploaded(true);
      //   this.modalService.closeModal();
      // })
    }
  }

  cancel() {
    this.modalService.closeModal();
  }

  dropped(files: NgxFileDropEntry[]) {
    console.log("files", files)

    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileName = file.name
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  fileOver(event) {
    console.log(event);
  }

  fileLeave(event) {
    console.log(event);
  }


}

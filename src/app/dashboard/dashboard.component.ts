import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const AWS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  s3: any;
  bucketName: string;
  selectedFiles: any;

  allItems: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:4100/api/getItems', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
      .subscribe((data: any) => {
        console.log(data);
        this.allItems = data.data;
      })
  }

  getBuckets() {
    console.log('called')
    this.s3.listObjects({Delimiter: '/'}, function(err, data) {
      if(err) {
        console.log(err);
        console.log(AWS.config)
      }
      else {
        console.log(data);
      }
    })
  }

  onUploadFile(event) {
    this.selectedFiles = event.target.files;

    console.log(this.selectedFiles.item(0).name, 'uo')
    console.log(this.selectedFiles.item(0));

    // this.selectedFiles.forEach((file) => {
      let params = {
        Body: this.selectedFiles.item(0),
        Bucket: this.bucketName,
        Key: this.selectedFiles.item(0).name
      }

      this.s3.putObject(params, (err, data) => {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Success', data);
        }
      })
    // })
    

    
  }
}

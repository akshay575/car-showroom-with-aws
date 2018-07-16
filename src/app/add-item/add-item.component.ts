import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

declare const AWS: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  s3: any;
  bucketName: string;
  selectedFile: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.bucketName = '';
    var bucketRegion = '';
    var IdentityPoolId = '';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.bucketName }
    });
  }

  onAddItem(form: NgForm) {
    console.log('ietm addde', form);

    let params = {
      Body: this.selectedFile.item(0),
      Bucket: this.bucketName,
      Key: this.selectedFile.item(0).name,
      ACL: 'public-read'
    }

    this.s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        let carData = {
          title: form.value.title,
          desc: form.value.desc,
          url: data.Location
        }
    
        this.http.post('http://localhost:4100/api/add', carData, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
          .subscribe((data: any) => {
            console.log('data', data);
            if(data.affectedRows > 0) {
              this.router.navigate(['../dashboard']);
            }
          })
      }
    })

    

  }

  fileUpload(event) {
    this.selectedFile = event.target.files;
  }

}

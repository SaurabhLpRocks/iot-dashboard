import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';

import { BaseService } from '../../@core/data/base.service';
import { HelperService } from '../../shared/services/helper.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html'
})
export class ECommerceComponent implements OnInit {
  constructor(private http: HttpClient, private helperService:HelperService) {}

  ngOnInit() {
    // const options = { params: new HttpParams().set('top', '5').set('skip', '0') };
    // this.http.get('http://localhost:5000/tasks', options).subscribe(res => {
    //   console.log('task res ', res);
    // });
    this.helperService.startLoader();
  }

  throwClientError() {
    throw new Error('Something horrible happened!!');
  }
}

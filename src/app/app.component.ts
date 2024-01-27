import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { RequestQueueService } from './queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private requestQueueService: RequestQueueService) {}

  ngOnInit(): void {
    this.requestQueueService.addToQueue(this.getuser(1)); 
    this.requestQueueService.addToQueue(this.getuser(2));
    this.requestQueueService.addToQueue(this.getuser(201));
    this.requestQueueService.addToQueue(this.getuser(3));

    // Subscribe to response observable
    this.requestQueueService.getResponseObservable().subscribe((data) => {
      if (data.response) {
        // Handle successful response
        console.log('Response:', data.response);
      } else if (data.error) {
        // Handle error
        console.error('Error:', data.error);
      }
    });
  }

  getuser(id: number): Observable<any> {
    // Replace this with your actual HTTP request
    return ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

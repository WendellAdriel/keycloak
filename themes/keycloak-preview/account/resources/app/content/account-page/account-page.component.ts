/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from '@angular/http';
import {FormGroup} from '@angular/forms';

import {Features} from '../../page/features';
import {AccountServiceClient} from '../../account-service/account.service';

declare const features: Features;

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
    private isRegistrationEmailAsUsername: boolean = features.isRegistrationEmailAsUsername;
    private isEditUserNameAllowed: boolean = features.isEditUserNameAllowed;
    
    @ViewChild('formGroup') private formGroup: FormGroup;
    
    // using ordinary variable here for case where username
    // is not editable and not controlled by formGroup
    private username: string;

    constructor(private accountSvc: AccountServiceClient ) {
        accountSvc.doGetRequest("/", (res: Response) => this.handleGetResponse(res));
    }
    
    public saveAccount() {
        console.log("posting: " + JSON.stringify(this.formGroup.value));
        this.accountSvc.doPostRequest("/", (res: Response) => this.handlePostResponse(res), this.formGroup.value);
        this.formGroup.reset(this.formGroup.value);
    }
    
    protected handleGetResponse(res: Response) {
      const response: any = res.json();
      this.username = response.username;
      this.formGroup.reset(response);
      console.log('**** response from account REST API ***');
      console.log(JSON.stringify(res));
      console.log('*** formGroup ***');
      console.log(JSON.stringify(this.formGroup.value));
      console.log('***************************************');
    }
    
    protected handlePostResponse(res: Response) {
      console.log('**** response from account POST ***');
      console.log(JSON.stringify(res));
      console.log('***************************************');
    }
    
    ngOnInit() {
    }
    
}
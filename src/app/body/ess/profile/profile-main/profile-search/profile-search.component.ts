import {Component, HostBinding , OnInit} from '@angular/core';
import {Search} from '../../../../../_global/search';
import {Profile} from '../../../../../_global/profile';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {GeneralOps} from "../../../../../utility/GeneralOps";

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  // employeeId = Search.SEARCH_EMPLOYEE_ID;
  employeeId = this.getEmpID();
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  @HostBinding('class') classes = 'profile-page';
  constructor(private route: ActivatedRoute , private router: Router) {
  }

  ngOnInit() {
  }

  getEmpID() {

    if(this.router.url !== '/profile/_search'){
      const urlEmpNo= this.route.snapshot.params['empNo'];
      const localEmpNo =localStorage.getItem('lsei_');
      if (urlEmpNo !=localEmpNo){
        Search.SEARCH_EMPLOYEE_ID = urlEmpNo;
        localStorage.setItem('lsei_', urlEmpNo);
      }
    }
    return Search.SEARCH_EMPLOYEE_ID;
  }

}

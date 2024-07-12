import {Component, OnInit} from '@angular/core';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {EmployeeService} from '../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {
  ResourceAllocationService
} from '../../../../service/new-resource-allocation-service/resource-allocation.service';

@Component({
  selector: 'app-settings-resource-allocation-users',
  templateUrl: './settings-resource-allocation-users.component.html',
  styleUrls: ['./settings-resource-allocation-users.component.css']
})
export class SettingsResourceAllocationUsersComponent implements OnInit {

  users = ['Executive', 'PM', 'HR'];
  designationGroup = '';
  selectedUser = 'Executive';
  addNewUserClicked = false;
  newUsersList = [];
  employeeData = [];
  companyData = [];
  businessUnitsData = [];
  departmentsData = [];

  selectedCompany = 0;
  selectedBusinessUnit = 0;
  selectedDepartment = 0;


  newEmployee = {
    'empName': null,
    'empNo': '',
    'empProfileId': 0,
    'empType': '',
    'departmentId': 0,
  };

  title1: any;
  successModalOpen = false;
  failedModalOpen = false;
  empNo = '';
  alreadyAssigned = false;
  showConfirmationMsg = false;
  isLoading = false;
  errorMsg = '';

  constructor(private modalService: ModalUiServiceService,
              private employeeService: EmployeeService,
              private resourceAllocationService: ResourceAllocationService) {
  }

  ngOnInit() {
    this.changeUser(this.selectedUser);
    this.getCompanyDetails();
  }

  /**
   * Change which user type to view
   * @param user
   */
  changeUser(user: string) {
    this.employeeData = [];
    this.selectedUser = user;
    this.isLoading = true;
    this.resourceAllocationService.getResourceAllocationUsers(this.empNo, this.selectedUser)
      .subscribe((data) => {
        this.employeeData = data as Array<any>;
        this.isLoading = false;
        if (this.employeeData[0].empType === 'HR Manager' && this.employeeData.length > 0) {
          this.alreadyAssigned = true;
        }
        this.isLoading = false;
      });
  }

  getUniqueDepartmentIds(): number[] {
    return Array.from(new Set(this.employeeData.map(employee => employee.departmentId)));
  }


  getEmployeesByDepartment(departmentId: number) {
    return this.employeeData.filter(employee => employee.departmentId === departmentId);
  }


  addNewUser() {
    this.addNewUserClicked = true;
    this.newUsersList = [];
  }


  hideAddUserModal() {
    this.addNewUserClicked = false;
  }

  getCompanyDetails() {
    this.employeeService.getCompany()
      .subscribe((data: any) => {
        this.companyData = data;
        if (this.companyData) {
          this.selectedCompany = this.companyData[0].companyID;
          this.getBusinessUnitsDetails();
        }
      });
  }

  getBusinessUnitsDetails() {
    this.businessUnitsData = [];
    this.employeeService.getBusinessUnits(this.selectedCompany)
      .subscribe((data: any) => {
        this.businessUnitsData = data;
        if (this.businessUnitsData) {
          this.selectedBusinessUnit = this.businessUnitsData[0].id;
          this.getDepartmentsDetails();
        }
      });
  }

  getDepartmentsDetails() {
    this.departmentsData = [];
    this.employeeService.getDepartments(this.selectedCompany, this.selectedBusinessUnit)
      .subscribe((data: any) => {
        this.departmentsData = data;
        if (data.length > 0) {
          this.selectedDepartment = this.departmentsData[0].id;
        }
      });
  }

  getDepartmentName(id: any) {
    return this.departmentsData.find(d => d.id === id).name;
  }

  /**
   * Add one by one entered employee numbers to a temporary list
   */
  addToNewUserList() {
    if (this.newEmployee.empNo !== '') {
      if (this.selectedUser === 'HR Manager' && this.alreadyAssigned === true) {
        this.showConfirmationMsg = true;
      }
      this.newEmployee.empType = this.selectedUser;
      this.newEmployee.departmentId = this.selectedDepartment;
      this.newUsersList.push(this.newEmployee);
      this.newEmployee = {
        'empName': null,
        'empNo': '',
        'empProfileId': 0,
        'empType': '',
        'departmentId': 0
      };
    }
  }

  /**
   * Remove added employee numbers from the temporaray list
   * @param index
   */
  removeUserFromList(index: number) {
    if (index !== -1) {
      this.newUsersList.splice(index, 1);
    }
  }

  /**
   * Save all the employee numbers that are in the temporary list
   */
  saveNewUsers() {
    this.failedModalOpen = false;
    this.successModalOpen = false;
    this.isLoading = false;
    this.resourceAllocationService.saveResourceAllocationUsers(this.newUsersList, this.designationGroup)
      .subscribe((users) => {
        this.hideAddUserModal();
        this.title1 = 'Saved';
        this.successModalOpen = true;
        this.changeUser(this.selectedUser);
        this.isLoading = false;
      }, (err) => {
        this.errorMsg = err.error;
        this.failedModalOpen = true;
      });

  }

  /**
   * Remove users from the settings list
   * @param data
   */
  removeUser(data: any) {
    this.resourceAllocationService.deleteResourceAllocationUser(data.id)
      .subscribe((users) => {
        this.title1 = 'Deleted';
        this.successModalOpen = true;
        this.changeUser(this.selectedUser);
      });
  }

  replaceUser() {
    this.showConfirmationMsg = false;
    if (this.employeeData[0].empType === 'HR Manager' && this.employeeData.length > 0) {
      this.alreadyAssigned = true;
      this.removeUser(this.employeeData[0]);
      this.saveNewUsers();
      this.hideAddUserModal();
    }
  }

  closeConfirmationModal() {
    this.modalService.hideModal('successWarningModal');
    this.newUsersList = [];
    this.hideAddUserModal();
  }

  convertToUppercase(value: string): void {
    this.newEmployee.empNo = value.toUpperCase();
  }

  /**
   * In HR users settings for each department there is a default person that the requests are approved are assigned to
   * User can change which user will be the default person
   * @param data
   */
  changeDefaultUser(data: any) {
    if (data.departmentStatus === 0) {
      this.resourceAllocationService.changeDefaultUser(data)
        .subscribe((res: any) => {
          this.changeUser(this.selectedUser);
        }, (err) => {
          this.errorMsg = err.error;
          this.failedModalOpen = true;
        });
    }

  }
}


import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DepartmentService } from 'src/app/_services/department.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private departmentService: DepartmentService,
              private notificationService: NotificationService) { }


  ngOnInit() {
    this.service.getEmployees();
  }

  onClear() {
    const $key = this.service.form.get('$key').value;
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.form.patchValue({$key});
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { filter } from 'minimatch';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService, private departmentService: DepartmentService) { }

  listData: MatTableDataSource<any>;
  displayedColums: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        const array = list.map(item => {
          // let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          //  const departmentName = this.departmentService.getDepartmentName(item.payload.val().department);
           return {
            $key: item.key,
            //  departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // tslint:disable-next-line:no-shadowed-variable
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColums.some(res => {
            return res !== 'actions' && data[res].toLowerCase().indexOf(filter) !== -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}

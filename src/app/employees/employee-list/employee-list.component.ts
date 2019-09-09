import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig  } from '@angular/material';
import { DepartmentService } from 'src/app/_services/department.service';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/_services/notification.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService, private departmentService: DepartmentService,
              private dialog: MatDialog, private notificationService: NotificationService,
              private dialogService: DialogService) { }

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

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete($key) {
    // if (confirm('Are you sure to delete this record ?')) {
    // this.service.deleteEmployee($key);
    // this.notificationService.warn('! Deleted successfully');
    // }
    this.dialogService.openConfirmDialog('Are you sure of deleting this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteEmployee($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });

  }

}

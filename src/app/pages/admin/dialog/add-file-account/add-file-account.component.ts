import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AccountInfo } from 'src/app/Model/account-info';
import { ExcelHandleService } from 'src/app/services/local/excel-handle.service';
import { inputAccountSchema } from 'src/app/shared/utilities/excel-schema';
import { AddAccountDialogComponent } from '../add-account-dialog/add-account-dialog.component';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-add-file-account',
  templateUrl: './add-file-account.component.html',
  styleUrls: ['./add-file-account.component.scss']
})
export class AddFileAccountComponent {
  accountListForm: FormArray<any>;
  fileName = '';
  accountSchema = inputAccountSchema;
  dataSourceInput = new MatTableDataSource(undefined);
  displayedColumns: string[] = ['position', 'code', 'fullName', 'type', 'actions'];

  constructor(public dialogRef: MatDialogRef<AddFileAccountComponent>,
     private excelHandleService: ExcelHandleService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private manageUserService: ManageUserService,
      private showToastService: ToastService) {
    this.accountListForm = new FormArray<any>([]);
   }


  onSubmitData() {
    this.manageUserService.createListAccount(this.accountListForm.value).subscribe({
      next: (response: any) => {
        if(response?.data.newAccount.length > 0){
          this.showToastService.showSuccessToast(`Thêm mới ${response?.data?.newAccount.length} tài khoản thành công`);
        }
        if(response?.data.duplicatedAccount.length > 0){
          this.showToastService.showErrorToast(`Thêm mới ${response?.data?.duplicatedAccount.length} thất bại. Tài khoản đã được tạo`);
        }
        this.dialogRef.close(response);
      },
      error: (response) => {
        this.showToastService.showErrorToast(response.error.message);
      }
    });
  }
  onClose(result?: any) {
    this.dialogRef.close(result);
  }

  onFileSelected(event: any) {
    event.preventDefault();
    console.log(event.target.files[0].name);
    this.fileName = event.target.files[0].name;
    this.excelHandleService.readExcelFile(event.target.files[0], this.accountSchema).then((data) => {
      data = data.map((element: any) => {
        return {
          ...element,
          gender: element.gender == 'nam' ? 'male' : 'female',
        }});
      this.dataSourceInput.data = data;
      this.accountListForm.clear();
      data.forEach((element: any) => {
        this.accountListForm.push(this.buildFormAccountHelper(element));
      });
      console.log(this.accountListForm.value);

    })
    event.target.value = '';
  }

  onViewData(data: any) {
    const dialogRef = this.dialog.open(AddAccountDialogComponent, {
      data: {...data, isView: true,},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });

  }

  onDeleteRow(index: number) {
    this.showToastService.confirmDelete(this.handleDelete.bind(this, index));
  }

  handleDelete(index: number) {
    this.accountListForm.removeAt(index);
    this.dataSourceInput.data.splice(index, 1);
    this.dataSourceInput.data = [...this.dataSourceInput.data];
  }

  buildFormAccountHelper(account: any){
    return this.fb.group({
      role: account.role,
      email: account.email,
      password: account.password,
      fullName: account.fullName,
      code: account.code,
      phoneNumber: account.phoneNumber,
      address: account.address,
      class: account.class,
      major: account.major,
      gender: account.gender
    });
  }
}

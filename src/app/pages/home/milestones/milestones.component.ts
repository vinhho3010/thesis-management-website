import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { AddMilestoneComponent } from '../dialog/add-milestone/add-milestone.component';
import { MilestoneService } from 'src/app/services/milestone.service';
import { LoaderService } from 'src/app/services/loader.service';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {
  milestonesList: any[] = [];
  // schoolYear = schoolYear;

  // filterOptionForm = new FormGroup({
  //   schoolYear: new FormControl(schoolYear[schoolYear.length -1]),
  //   semester: new FormControl(1),
  // })

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private milestoneService: MilestoneService,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadMilestones();
  }

  loadMilestones() {
    this.loadingService.setLoading(true);
    const classId = this.authService.getClassId();
    this.milestoneService.getClassMilestones(classId as string).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.milestonesList = res;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast('Không tải được danh sách');
      }
    })
  }

  createMilestone(milestone: any) {
    const classId = this.authService.getClassId();
    this.milestoneService.createMilestone(classId as string, milestone).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Tạo thành công');
        this.loadMilestones();
      },
      error: (err) => {
        this.toastService.showErrorToast('Không tạo được');
      }
    })
  }

  updateMilestone(milestone: any) {
    this.milestoneService.updateMilestone(milestone?._id, milestone).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Cập nhật thành công');
        this.loadMilestones();
      },
      error: (err) => {
        this.toastService.showErrorToast('Không cập nhật được');
      }
    })
  }


  onAddMilestone() {
    const addMilestoneDialog = this.dialog.open(AddMilestoneComponent, {});
    addMilestoneDialog.afterClosed().subscribe((res) => {
      if(res?.result) {
        this.createMilestone(res.result);
      }
    })
  }

  onEditMilestone(milestone: any) {
    const addMilestoneDialog = this.dialog.open(AddMilestoneComponent, {
      data: {
        milestone: milestone,
      }
    });
    addMilestoneDialog.afterClosed().subscribe((res) => {
      if(res?.updateResult) {
        this.updateMilestone(res.updateResult);
      }
    })
  }

  onDeleteMilestone(milestone: any) {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa?',
    this.deleteMilestoneHandler.bind(this, milestone)
    );
  }

  deleteMilestoneHandler(milestone: any) {
    this.milestoneService.deleteMilestone(milestone._id).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Xóa thành công');
        this.loadMilestones();
      },
      error: (err) => {
        this.toastService.showErrorToast('Không xóa được');
      }
    })
  }
}

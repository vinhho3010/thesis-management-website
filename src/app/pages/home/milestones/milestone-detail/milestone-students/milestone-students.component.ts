import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/ex-router.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { AddMilestoneComponent } from '../../../dialog/add-milestone/add-milestone.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-milestone-students',
  templateUrl: './milestone-students.component.html',
  styleUrls: ['./milestone-students.component.scss'],
})
export class MilestoneStudentsComponent implements OnInit {
  milestoneId: string;
  currentMilestone: any;

  constructor(
    private milestoneService: MilestoneService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.milestoneId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.loadCurrentMilestone();
  }

  loadCurrentMilestone(): void {
    this.loadingService.setLoading(true);
    this.milestoneService.getMilestone(this.milestoneId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.currentMilestone = res;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
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

  updateMilestone(milestone: any) {
    this.milestoneService.updateMilestone(milestone?._id, milestone).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Cập nhật thành công');
        this.loadCurrentMilestone();
      },
      error: (err) => {
        this.toastService.showErrorToast('Không cập nhật được');
      }
    })
  }

  onGoBack() {
    this.router.navigate(['/home/milestones']);
  }
}

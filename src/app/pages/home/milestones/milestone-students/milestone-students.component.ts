import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/ex-router.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { AddMilestoneComponent } from '../../dialog/add-milestone/add-milestone.component';
import { MatDialog } from '@angular/material/dialog';
import { ThesisVersion } from 'src/app/Model/milestone';
import { MatSelectChange } from '@angular/material/select';
import { ViewDocsComponent } from '../../dialog/view-docs/view-docs.component';

@Component({
  selector: 'app-milestone-students',
  templateUrl: './milestone-students.component.html',
  styleUrls: ['./milestone-students.component.scss'],
})
export class MilestoneStudentsComponent implements OnInit {
  milestoneId: string;
  currentMilestone: any;
  submittedStudentCount = 0;
  thesisVersionList: ThesisVersion[] = [];
  filterSelected = 'all';
  submittedStudentList: any[] = [];
  notSubmittedStudentList: any[] = [];

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
        this.thesisVersionList = this.currentMilestone.thesisVersionList;
        this.loadStudentList();
        this.countSubmittedStudent();
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  loadStudentList(): void {
    const submitList = [] as any[];
    const notSubmitList = [] as any[];
    this.thesisVersionList.forEach((version: any) => {
      if (version?.url) {
        submitList.push(version);
      } else {
        notSubmitList.push(version);
      }
    });
    this.submittedStudentList = submitList;
    this.notSubmittedStudentList = notSubmitList;
  }

  countSubmittedStudent() {
    this.thesisVersionList.forEach((version: any) => {
      if (version.url) {
        this.submittedStudentCount++;
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

  onChangeFilter(event: MatSelectChange) {
    const filter = event.source.value;
    this.filterSelected = filter;
  }

  onGoBack() {
    this.router.navigate(['/home/milestones']);
  }

  onViewSubmitDoc(url: string) {
    const docsConfig = {
      data: {
        url: url,
      }
    }
    this.dialog.open(ViewDocsComponent, docsConfig)
  }
}

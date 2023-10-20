import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit {
  milestoneList = [] as any[];

  constructor(
    private milestoneService: MilestoneService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private router: Router
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
        this.milestoneList = res;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast('Không tải được danh sách');
      },
    });
  }

  onViewDetail(milestone: any) {
    this.router.navigate(['/process', milestone._id]);
  }
}

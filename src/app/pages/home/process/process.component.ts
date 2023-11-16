import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ThesisVersionService } from 'src/app/services/thesis-version.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit {
  thesisVersionsList = [] as any[];
  classId = this.authService.getClassId();
  constructor(
    private milestoneService: MilestoneService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private router: Router,
    private thesisVersionService: ThesisVersionService
  ) {}

  ngOnInit(): void {
    this.loadThesisVersions();
  }

  loadThesisVersions() {
    if(this.classId) {
      const studentId = this.authService.getUser()?._id as string;
      this.loadingService.setLoading(true);
      this.thesisVersionService.getStudentThesisVersion(studentId).subscribe({
        next: (res) => {
          this.loadingService.setLoading(false);
          this.thesisVersionsList = res;
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toastService.showErrorToast('Không tải được danh sách');
        },
      });
    }
  }

  onViewDetail(version: any) {
    this.router.navigate(['/process', version?.milestone._id]);
  }

  isExpried(date: Date) {
    const today = new Date();
    return new Date(date) < today;
  }
}

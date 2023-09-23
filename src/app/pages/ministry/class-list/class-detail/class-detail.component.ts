import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent {
  classId = '';

    constructor(private activatedRoute: ActivatedRoute, private classService: ClassService, private toastService: ToastService) { }

    ngOnInit(): void {
      this. classId = this.activatedRoute.snapshot.params['id'];
      this.loadClassInfo();
    }

    loadClassInfo(): void {
      this.classService.getClassInfo(this.classId).subscribe({
        next: (res) => {
          console.log(res);

        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }
}

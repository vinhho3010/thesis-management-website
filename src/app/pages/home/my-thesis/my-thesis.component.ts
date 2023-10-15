import { Component, OnInit } from '@angular/core';
import { Thesis } from 'src/app/Model/thesis';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-my-thesis',
  templateUrl: './my-thesis.component.html',
  styleUrls: ['./my-thesis.component.scss']
})
export class MyThesisComponent implements OnInit {
  thesisInfo!: Thesis
  constructor(private thesisService: ThesisService, private authService: AuthService, private toastService: ToastService) {
  }

  ngOnInit(): void {
      const userId = this.authService.getUser()._id;
      this.thesisService.getStudentThesis(userId).subscribe({
        next: (res)=> {
          console.log(res);

          this.thesisInfo = res as Thesis;
        },
        error: (err)=> {
          this.toastService.showErrorToast(err.error.message);
        }
      })
  }

}

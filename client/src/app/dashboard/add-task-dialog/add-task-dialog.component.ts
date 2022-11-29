import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../service/dashboard.service';
@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  @Input() taskId: string = '';
  @Input() name: string = '';
  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  constructor(public activeModal: NgbActiveModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if(this.taskId) {
      this.taskForm.patchValue({name: this.name});
    }
  }

  /**
   * Add task
   */
  save() {
    if (this.taskForm.valid) {
      console.log("in this")
      this.dashboardService.addTask(this.taskForm.value).subscribe(
        (res: any) => {
          console.log("res",res);
          this.activeModal.close(res);
        },
        (err: any) => {
          console.log(err)
          this.activeModal.close(null);
        }
      );
    }
  }

  /**
   * Update task
   */
  update() {
    if (this.taskForm.valid) {
      console.log("in this")
      this.dashboardService.updateTask(this.taskId,this.taskForm.value).subscribe(
        (res: any) => {
          console.log("res",res);
          this.activeModal.close(res);
        },
        (err: any) => {
          console.log(err)
          this.activeModal.close(null);
        }
      );
    }
  }

}

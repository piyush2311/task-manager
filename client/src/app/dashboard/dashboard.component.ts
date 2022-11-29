import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './service/dashboard.service';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component'
import { TaskList } from '../shared/interface';
import { ToastrService } from 'ngx-toastr';
import { ChartData, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;
  // Pie
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Total task','Completed task'],
    datasets: [{
      data: []
    }]
  };
  pieChartType: ChartType = "pie";
  query: string = '';
  taskList: any;
  dashboardData: any;
  closeResult: string = '';
  isShow: boolean = false;
  constructor(private modalService: NgbModal, private dashboardService: DashboardService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getTaskList();
    this.getDashboardData();

  }

  getTaskList() {
    this.isShow = true;
    this.dashboardService.getTask().subscribe((res) => {
      this.taskList = res;
      this.isShow = false;
    }, (err) => {
      console.log(err)
      this.isShow = false;
    })
  }

  /**
   * Open add task dialog
   *
   * @return response()
   */
  addTaskDialog() {
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.id = null;
    modalRef.result
      .then((result) => {
        if (result) {
          this.toastr.success("Task added successfully");
          this.ngOnInit();
        } else this.toastr.success("Something went wrong");
      });
  }

  /**
   * Open update task dialog
   *
   * @return response()
   */
  updateTaskDialog(taskObj: any) {
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.taskId = taskObj?._id;
    modalRef.componentInstance.name = taskObj?.name;
    modalRef.result
      .then((result) => {
        if (result) {
          this.toastr.success("Task updated successfully");
          this.getTaskList();
        } else this.toastr.success("Something went wrong");
      });
  }

  /**
   * Open delete dialog
   * @param content 
   * @param taskId 
   * @param index 
   */
  openDeleteDailog(content: any, taskId: string, index: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteTask(taskId, index);
      }
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  /**
   * Delete task
   * @param id 
   * @param index 
   */
  deleteTask(id: any, index: number) {
    this.dashboardService.deleteTask(id).subscribe((res: any) => {
      this.getTaskList();
      this.getDashboardData()
      this.toastr.success("Task deleted successfully");
    }, (err: any) => {
      const errorMsg = err?.error?.validation?.errors.map((v: any) => v.message).join("<br>")
      this.toastr.error(errorMsg, err?.error?.message)
    })
  }

  completTask(index: number, completed: boolean) {
    this.taskList[index].completed = !completed;
    const id = this.taskList[index]._id;
    const body = {
      name: this.taskList[index].name,
      completed: this.taskList[index].completed
    }
    let completedText = this.taskList[index].completed ? 'completed' : 'incomplete'
    this.dashboardService.updateTask(id, body).subscribe((res) => {
      this.toastr.success(`Task ${completedText}`);
      this.ngOnInit();
    }, (err) => {
      this.taskList[index].status = status;
      this.toastr.error("Something went wrong")
    })
  }

  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe((res) => {
      this.dashboardData = res;
      if(this.dashboardData) {
        this.pieChartData.datasets[0].data = [this.dashboardData.totalTask,this.dashboardData.tasksCompleted];
      }
      this.chart?.update();
    }, (err) => {
      console.log(err)
    })
  }

}

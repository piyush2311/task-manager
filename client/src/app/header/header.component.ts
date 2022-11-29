import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = environment.name;
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('token');
    this.toastr.success("Logout successfully")
    //this.router.navigateByUrl('/admin/dashboard');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/interface';
import { UserService } from '../shared/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    apiKey: new FormControl('', [Validators.required])
  });
  serverErrorMessages: string = '';
  constructor(public router: Router,
    private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem('isLoggedin', 'true');
          this.userService.setToken(res['token']['token']);
          this.router.navigateByUrl('/dashboard');
          this.toastr.success("Login successfully")
        },
        (err: any) => {
          console.log(err.error)
          this.toastr.error(err.error)
        }
      );
    }
  }

}

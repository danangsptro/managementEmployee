import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loading = true;
    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {
      //matching email and password
      const user = res.find((a: any) => {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password
      })
      //condition check for login
      if (user) {
        Swal.fire({
          title: "Sucessfully!",
          text: "Logged in!",
          icon: "success"
        });
        this.loginform.reset();
        this.router.navigate(['employee'])
        this.loading = false;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User not found with these credentials",
        });
        this.loading = false;
      }
    }
      , err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        this.loading = false;

      }
    )
  }
}

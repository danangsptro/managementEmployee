import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupform!: FormGroup
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  // creation
  signup() {
    this.loading = true;
    this.http.post<any>("http://localhost:3000/signup", this.signupform.value).subscribe(res => {
      Swal.fire({
        title: "Sucessfully!",
        text: "Student registred!",
        icon: "success"
      });
      this.signupform.reset();
      this.router.navigate(['login'])
      this.loading = false;
    }, err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      this.loading = false;
    })
  }

}

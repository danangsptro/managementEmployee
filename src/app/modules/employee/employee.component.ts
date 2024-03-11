import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employeeData } from 'src/app/dto/all-data';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  employeeDTO: employeeData = new employeeData;
  allEmployee: any;
  lengthData: any;
  isOpen: boolean = false;
  title: string = '';
  currentDate: Date = new Date();
  searchText = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      BasicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.getdata()
  }

  addEmployee(): void {
    this.showAdd = true;
    this.showUpdate = false;

    // Check data id
    let id: any = '';
    if (this.allEmployee.length) {
      let largestObject = this.allEmployee[0];
      for (let i = 1; i < this.allEmployee.length; i++) {
        if (this.allEmployee[i].id > largestObject.id) {
          largestObject = this.allEmployee[i];
        }
      }
      id = +largestObject.id + 1
    } else {
      id = '1';
    }

    this.employeeDTO.username = this.formValue.value.username
    this.employeeDTO.firstName = this.formValue.value.firstName
    this.employeeDTO.lastName = this.formValue.value.lastName
    this.employeeDTO.email = this.formValue.value.email
    this.employeeDTO.birthDate = this.formValue.value.birthDate
    this.employeeDTO.BasicSalary = this.formValue.value.BasicSalary
    this.employeeDTO.status = this.formValue.value.status
    this.employeeDTO.group = this.formValue.value.group
    this.employeeDTO.description = this.currentDate
    this.employeeDTO.id = id.toString();

    this.api.postEmployee(this.employeeDTO).subscribe(res => {
      Swal.fire({
        title: "Sucessfully!",
        text: "Record added sucessfully!",
        icon: "success"
      });
      this.isOpen = false;
      this.formValue.reset();
      this.getdata()
    }, err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    })
  }

  edit(data: any): void {
    this.showAdd = false;
    this.showUpdate = true
    this.employeeDTO.id = data.id;

    this.formValue.controls['username'].setValue(data.username)
    this.formValue.controls['firstName'].setValue(data.firstName)
    this.formValue.controls['lastName'].setValue(data.lastName)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['birthDate'].setValue(data.birthDate)
    this.formValue.controls['BasicSalary'].setValue(data.BasicSalary)
    this.formValue.controls['status'].setValue(data.status)
    this.formValue.controls['group'].setValue(data.group)
    this.formValue.controls['description'].setValue(data.description)
  }

  update() : void {
    let id: any = this.employeeDTO.id.toString()
    this.employeeDTO.username = this.formValue.value.username
    this.employeeDTO.firstName = this.formValue.value.firstName
    this.employeeDTO.lastName = this.formValue.value.lastName
    this.employeeDTO.email = this.formValue.value.email
    this.employeeDTO.birthDate = this.formValue.value.birthDate
    this.employeeDTO.BasicSalary = this.formValue.value.BasicSalary
    this.employeeDTO.status = this.formValue.value.status
    this.employeeDTO.group = this.formValue.value.group
    this.employeeDTO.description = this.formValue.value.description

    this.api.updateEmployee(this.employeeDTO, id).subscribe(res => {
      this.formValue.reset();
      this.getdata();
      Swal.fire({
        title: "Sucessfully!",
        text: "Record updated sucessfully!",
        icon: "success"
      });
      this.isOpen = false;
    },
      err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
  }

  getdata(): void {
    this.api.getEmployee()
      .subscribe(res => {
        this.allEmployee = res;
        this.lengthData = res.length;
      })
  }

  deleteEmployeee(data: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to permanently remove this data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteEmployee(data.id)
          .subscribe(res => {
            Swal.fire({
              title: "Deleted!",
              text: "Data deleted successfully.",
              icon: "success"
            });
            this.getdata();
          })
      }
    });

  }


  closeModal(): void {
    this.isOpen = false;
  }

  openModal(data: any, type: string): void {
    if (type === 'edit') this.title = 'Edit Data';
    else if (type === 'detail') this.title = 'Detail Data';

    this.isOpen = true;
    this.employeeDTO.id = data.id;

    this.formValue.controls['username'].setValue(data.username)
    this.formValue.controls['firstName'].setValue(data.firstName)
    this.formValue.controls['lastName'].setValue(data.lastName)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['birthDate'].setValue(data.birthDate)
    this.formValue.controls['BasicSalary'].setValue(data.BasicSalary)
    this.formValue.controls['status'].setValue(data.status)
    this.formValue.controls['group'].setValue(data.group)
    this.formValue.controls['description'].setValue(data.description)
  }

  createData(type: string): void {
    this.title = type;
    this.isOpen = true;
  }
}

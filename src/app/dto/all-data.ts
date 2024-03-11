// export interface employeeData {
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthDate: Date;
//   BasicSalary: any;
//   status: string;
//   group: string;
//   description: string;
// }

export class employeeData {
  username: string = '';
  firstName: string = '' ;
  lastName: string = '';
  email: string ='';
  birthDate!: Date;
  BasicSalary!: number;
  status!: string;
  group!: string;
  description!: any;
  id: string = "0";
}
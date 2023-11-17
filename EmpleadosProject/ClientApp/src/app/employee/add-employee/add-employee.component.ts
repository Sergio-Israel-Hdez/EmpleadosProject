import {Component, Inject} from '@angular/core';
import {EmpleadoBE} from '../EmployeeEntity/empleado-be';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  public _baseUrl:string;
  nuevoEmpleado:EmpleadoBE = {
    id:0,
    nombre:'',
    apellido:''
  }

  constructor(private http:HttpClient,@Inject('BASE_URL_V2') baseUrl:string) {
    this._baseUrl = baseUrl;
  }
  agregarEmpleado(){
    this.http.post(this._baseUrl+'Empleados/AddEmployee',this.nuevoEmpleado).subscribe(
      result =>{
        this.nuevoEmpleado = {nombre:'',apellido:'',id:0};
      },
      error => {
        console.error('error al agregar el empleado',error);
      }
    );
  }
}

import { Component,Inject } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EmpleadoBE} from '../EmployeeEntity/empleado-be';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent {
  public  empleados: EmpleadoBE[] = [];
  public _baseUrl:string;

  ngOnInit(){
    this.obtenerEmpleados();
  }
  constructor(private http:HttpClient,@Inject('BASE_URL_V2') baseUrl:string,private router: Router) {
    this._baseUrl = baseUrl;
  }
  obtenerEmpleados():void{
    this.http.get<EmpleadoBE[]>(this._baseUrl+'Empleados/GetAllEmployee').subscribe(result => {
      this.empleados = result;
    },error => console.error(error));
  }
  eliminarEmpleado(id:number): any{
     this.http.delete(this._baseUrl+'Empleados/DeleteEmployee?employeeId='+id,{observe: 'response'})
       .subscribe(
         (response: HttpResponse<any>)=>{
           if (response.status === 200){
             console.log('se elimino el empleado id:'+id);
             this.obtenerEmpleados();
           }else{
             console.error('Error al eliminar empleado. Código de estado:', response.status);
           }
         },error => {
           console.error('Error al eliminar empleado',error);
         }
       )
  }
  editarEmpleado(idEmpleado:number){
    this.router.navigate(['/update-employee',idEmpleado]);
  }
}



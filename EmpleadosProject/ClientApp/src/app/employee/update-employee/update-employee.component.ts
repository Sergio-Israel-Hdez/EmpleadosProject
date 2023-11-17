import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoBE} from "../EmployeeEntity/empleado-be";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  empleadoId?:number;
  empleado:EmpleadoBE = {id:0,nombre:'',apellido:''};
  public _baseUrl:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL_V2') baseUrl:string,) {
    this._baseUrl = baseUrl;
  }
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.empleadoId = +params['id'];
      this.cargarDetallesEmpleado();
    })
  }
  cargarDetallesEmpleado(){
    this.http.get<EmpleadoBE>(this._baseUrl+'Empleados/GetEmployeeById?id='+this.empleadoId)
      .subscribe(result =>{
        this.empleado = result;
        console.log('detalle empleado',result);
      },error => {console.error('error al obtener detalles del empleado',error);});
  }
  guardarCambios(){

    //this.router.navigate(['/home-employee']);
    this.http.put(this._baseUrl+'Empleados/UpdateEmployee?id='+this.empleadoId,this.empleado)
      .subscribe(result => {
        this.router.navigate(['/home-employee']);
      },error => {console.error('Error al actualizar el empleado',error);})
  }
}

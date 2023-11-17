using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmpleadosProject.Models;
using EmpleadosProject.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmpleadosProject.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private IGenericRepository<Empleado> genericRepository = null;

        public EmpleadosController()
        {
            this.genericRepository = new GenericRepository<Empleado>();
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllEmployee()
        {
            return Ok(genericRepository.GetAll());
        }
        
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetEmployeeById(int id)
        {
            var result = genericRepository.GetById(id);
            if (result!=null)
            {
                return Ok(result);
            }

            return BadRequest();
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddEmployee([FromBody] Empleado empleado)
        {
            if (ModelState.IsValid)
            {
                genericRepository.Insert(empleado);
                genericRepository.Save();
                return Ok();
            }

            return BadRequest(new { mensaje = "Parametros invaldo" });
        }

        [HttpPut]
        [Route("[action]")]
        public IActionResult UpdateEmployee(int id, [FromBody] Empleado empleado)
        {
            var empleadoToUpdate = genericRepository.GetById(id);
            if (empleadoToUpdate!=null)
            {
                genericRepository.Update(id,empleado);
                genericRepository.Save();
                return Ok();
            }

            return BadRequest($"Empleado Id = {id}, no se actualizo");
        }

        [HttpDelete]
        [Route("[action]")]
        public IActionResult DeleteEmployee(int employeeId)
        {
            var empleadoToDelete = genericRepository.GetById(employeeId);
            if (empleadoToDelete!=null)
            {
                genericRepository.Delete(employeeId);
                genericRepository.Save();
                return Ok();
            }

            return BadRequest($"no se pudo eliminar el empleado id = {employeeId}");
        }
    }
}

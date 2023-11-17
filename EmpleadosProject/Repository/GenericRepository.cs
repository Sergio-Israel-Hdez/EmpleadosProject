using EmpleadosProject.Models;
using Microsoft.EntityFrameworkCore;

namespace EmpleadosProject.Repository;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private FacturaElectronicaContext _context;
    private DbSet<T> table;

    public GenericRepository()
    {
        this._context = new FacturaElectronicaContext();
        table = _context.Set<T>();
    }
    public IEnumerable<T> GetAll()
    {
        return table.ToList();
    }

    public T GetById(object id)
    {
        return table.Find(id);
    }

    public void Insert(T obj)
    {
        table.Add(obj);
    }

    public void Update(int id,T obj)
    {
        // Obtener la entidad original desde la base de datos
        var originalObj = GetById(id);
    
        if (originalObj != null)
        {
            // Copiar los valores de las propiedades del objeto actualizado a la entidad original
            _context.Entry(originalObj).CurrentValues.SetValues(obj);
            // Marcar la entidad original como modificada
            _context.Entry(originalObj).State = EntityState.Modified;
        }
    }

    public void Delete(object id)
    {
        T existing = table.Find(id);
        table.Remove(existing);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}
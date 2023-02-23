let inventario = [];

function agregarProducto() {
  // Obtener los valores del formulario
  let nombre = document.getElementById('nombre-producto').value;
  let cantidad = parseInt(document.getElementById('cantidad-producto').value);
  let precioCompra = parseInt(document.getElementById('precio-compra').value);
  let precioVenta = parseInt(document.getElementById('precio-venta').value);

  // Crear un objeto con los datos del producto
  let producto = {
    id: inventario.length + 1,
    nombre: nombre,
    cantidad: cantidad,
    precioCompra: precioCompra,
    precioVenta: precioVenta,
    ganancia: (precioVenta - precioCompra) * cantidad
  };

  // Agregar el producto al array de inventario
  inventario.push(producto);

  // Limpiar los valores del formulario
  document.getElementById('nombre-producto').value = '';
  document.getElementById('cantidad-producto').value = '';
  document.getElementById('precio-compra').value = '';
  document.getElementById('precio-venta').value = '';

  // Actualizar la tabla de inventario
  mostrarInventario();
}

function mostrarInventario() {
  // Obtener la tabla de inventario
  let tabla = document.getElementById('tabla-inventario');

  // Eliminar todos los elementos de la tabla excepto la fila de encabezado
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  // Agregar una fila por cada producto en el inventario
  inventario.forEach(function(producto) {
    let fila = tabla.insertRow();
    fila.insertCell().textContent = producto.id;
    fila.insertCell().textContent = producto.nombre;
    fila.insertCell().textContent = producto.cantidad;
    fila.insertCell().textContent = '$' + producto.precioCompra;
    fila.insertCell().textContent = '$' + producto.precioVenta;
    fila.insertCell().textContent = '$' + producto.ganancia;
  });
}



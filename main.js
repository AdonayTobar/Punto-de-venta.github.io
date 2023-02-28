const venta = document.querySelector(".agregarProducto");
const agregarVenta = document.querySelector(".agregarP");
const inventario1  = document.querySelector(".inventario");
const inicio = document.querySelector(".inicio");
const ventaNueva = document.querySelector(".agregarVenta");
const nuevaVenta = document.querySelector(".ventaA");
const ventanaCompras = document.querySelector(".comprasF");
const btnCompras = document.querySelector(".mostrarCompras");

btnCompras.addEventListener("click", mostrarVCompras);
venta.addEventListener("click", ventanaVenta);
inicio.addEventListener("click", inicioVentana);
ventaNueva.addEventListener("click", buscarV);

 function inicioVentana(){
  inventario1.classList.remove("inactive");
  agregarVenta.classList.add("inactive");
  nuevaVenta.classList.add("inactive");
  ventanaCompras.classList.add("inactive");
}


function ventanaVenta(){
  agregarVenta.classList.remove("inactive");
  inventario1.classList.add("inactive");
  nuevaVenta.classList.add("inactive");
  ventanaCompras.classList.add("inactive");
}

function buscarV(){
  nuevaVenta.classList.remove("inactive");
  inventario1.classList.add("inactive");
  agregarVenta.classList.add("inactive");
  ventanaCompras.classList.add("inactive");
}
function mostrarVCompras(){
  ventanaCompras.classList.remove("inactive");
  inventario1.classList.add("inactive");
  nuevaVenta.classList.add("inactive");
  agregarVenta.classList.add("inactive");
}


let inventario = [];

function agregarProducto() {
  // Obtener los valores del formulario
  let nombre = document.getElementById('nombre-producto').value;
  let cantidad = parseInt(document.getElementById('cantidad-producto').value);
  let precioCompra = parseFloat(document.getElementById('precio-compra').value);
  let precioVenta = parseFloat(document.getElementById('precio-venta').value);

  // Crear un objeto con los datos del producto
  let producto = {
    id: inventario.length + 1,
    nombre: nombre,
    cantidad: cantidad,
    precioCompra: precioCompra,
    precioVenta: precioVenta,
    ganancia: ((precioVenta - precioCompra) * cantidad).toFixed(2)
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
  // Obtener la tabla de inventario completa
  let tablaCompleta = document.getElementById('tabla-inventario-completo');

  // Obtener la tabla de inventario filtrado
  let tablaFiltrada = document.getElementById('tabla-inventario-filtrado');

  // Obtener el texto de búsqueda
  let textoBusqueda = document.getElementById('busqueda').value.toLowerCase();

  // Eliminar todos los elementos de las tablas excepto la fila de encabezado
  while (tablaCompleta.rows.length > 1) {
    tablaCompleta.deleteRow(1);
  }
  
  while (tablaFiltrada.rows.length > 1) {
    tablaFiltrada.deleteRow(1);
  }

  // Agregar una fila por cada producto en el inventario completo
  inventario.forEach(function(producto) {
    let fila = tablaCompleta.insertRow();
    fila.insertCell().textContent = producto.id;
    fila.insertCell().textContent = producto.nombre;
    fila.insertCell().textContent = producto.cantidad;
    fila.insertCell().textContent = '$' + producto.precioCompra;
    fila.insertCell().textContent = '$' + producto.precioVenta;
    fila.insertCell().textContent = '$' + producto.ganancia;
  });

  // Agregar una fila por cada producto en el inventario que coincida con el texto de búsqueda
  inventario.forEach(function(producto) {
    if (producto.nombre.toLowerCase().includes(textoBusqueda)) {
      let fila = tablaFiltrada.insertRow();
      fila.insertCell().textContent = producto.id;
      fila.insertCell().textContent = producto.nombre;
      fila.insertCell().textContent = producto.cantidad;
      fila.insertCell().textContent = '$' + producto.precioVenta;
      
      // Agregar el botón "Agregar al carrito" a la última celda de la fila
      let agregarCarritoBtn = document.createElement('button');
      agregarCarritoBtn.textContent = '+';
      fila.insertCell().appendChild(agregarCarritoBtn);
      
      // Agregar el evento de escucha de clic al botón "Agregar al carrito"
      agregarCarritoBtn.addEventListener('click', function() {
        agregarAlCarrito(producto);
      });
    }
  });
}













let carrito = []; // Array para almacenar los productos seleccionados
let ventas = [];

function agregarAlCarrito(producto) {

  // Validar que hay suficiente cantidad en el inventario
  if (producto.cantidadEnInventario < 1) {
    alert('No hay suficiente cantidad en el inventario para este producto.');
    return;
  }

  // Agregar el producto al array del carrito
  let productoCarrito = {
    id: producto.id,
    nombre: producto.nombre,
    precioVenta: producto.precioVenta,
    cantidad: 1 // Establecer la cantidad inicial a 1
  };

  // Mostrar los productos del carrito en una tabla
  let tablaCarrito = document.getElementById('tabla-carrito');
  let fila = tablaCarrito.insertRow();
  
  // Insertar celda de cantidad editable
  let cantidadEditable = document.createElement('input');
  cantidadEditable.type = 'number';
  cantidadEditable.value = 1;
  cantidadEditable.min = 1;
  cantidadEditable.max = producto.cantidadEnInventario; // Agregar el límite máximo de cantidad
  cantidadEditable.addEventListener('input', function() {
    // Validar que la cantidad no sobrepase la cantidad en el inventario
    if (this.value > producto.cantidad) {
      alert('No hay suficiente cantidad en el inventario para este producto.');
      this.value = producto.cantidad; // Restablecer el valor al máximo
      
    }
    // Actualizar la cantidad del producto en el carrito
    productoCarrito.cantidad = this.value;

    // Actualizar el precio total al cambiar la cantidad
    let precioTotal = this.value * producto.precioVenta;
    fila.cells[3].textContent = '$' + precioTotal.toFixed(2);

  });
  fila.insertCell().appendChild(cantidadEditable);
  
  // Insertar celda de nombre
  fila.insertCell().textContent = producto.nombre;
  
  // Insertar celda de precio
  fila.insertCell().textContent = '$' + producto.precioVenta;
  
  // Insertar celda de precio total
  fila.insertCell().textContent = '$' + producto.precioVenta.toFixed(2);

  
  // Agregar botón al final de la tabla para descontar cantidades del inventario
  let boton = document.querySelector(".boton");
  boton.addEventListener('click', function() {
    // Descontar cantidades del inventario principal
    for (let i = 0; i < carrito.length; i++) {
      let producto = carrito[i];

      for (let j = 0; j < inventario.length; j++) {
        if (inventario[j].id === producto.id) {
          inventario[j].cantidad -= producto.cantidad;
          mostrarInventario();
          break;
        }
      }
    }

    // Crear la venta y agregarla al array de ventas
    let venta = {
      cliente: document.getElementById('cliente').value,
      productos: carrito.slice() // Hacer una copia del array del carrito para evitar que se modifique la venta después
    };
    ventas.push(venta);

    // Limpiar el carrito y la tabla de la compra
    carrito = [];
    while (tablaCarrito.rows.length > 1) {
      tablaCarrito.deleteRow(1);
    }

    document.getElementById('cliente').value = '';
    mostrarVentas();
  });

  carrito.push(productoCarrito);
}




function mostrarVentas() {
  let tablaVentas = document.getElementById('tabla-ventas');
  tablaVentas.innerHTML = ''; // Limpiar la tabla antes de volver a mostrar las ventas

  let inputBuscar = document.getElementById('buscar-venta');
  let filtro = inputBuscar.value.toLowerCase();

  ventas.forEach(function(venta) {
    // Filtrar las ventas por cliente
    if (venta.cliente.toLowerCase().includes(filtro)) {
      // Crear una nueva tabla para cada venta
      let tablaVenta = document.createElement('table');
      tablaVenta.classList.add("facturas");

      // Crear la fila de encabezado
      let encabezado = tablaVenta.createTHead().insertRow();
      encabezado.insertCell().textContent = 'Cantidad';
      encabezado.insertCell().textContent = 'Producto';
      encabezado.insertCell().textContent = 'Precio';
      encabezado.insertCell().textContent = 'Precio Total';

      // Crear una fila por cada producto en la venta
      let precioTotalVenta = 0;
      venta.productos.forEach(function(producto) {
        let fila = tablaVenta.insertRow();
        fila.insertCell().textContent = producto.cantidad;
        fila.insertCell().textContent = producto.nombre;
        fila.insertCell().textContent = '$' + producto.precioVenta;
        let precioTotal = producto.cantidad * producto.precioVenta;
        fila.insertCell().textContent = '$' + precioTotal.toFixed(2);
        precioTotalVenta += precioTotal;
      });

      // Agregar la fila de total de la venta
      let filaTotal = tablaVenta.insertRow();
      filaTotal.insertCell();
      filaTotal.insertCell();
      filaTotal.insertCell().textContent = 'Total:';
      filaTotal.insertCell().textContent = '$' + precioTotalVenta.toFixed(2);

      // Agregar la tabla de la venta a la tabla de ventas
      let fila = tablaVentas.insertRow();
      let celda = fila.insertCell();
      celda.colSpan = 2;
      celda.appendChild(tablaVenta);
    }
  });
}


// Mostrar el inventario por primera vez
mostrarInventario();


// Agregar un evento de escucha al campo de entrada para actualizar la tabla en función del texto de búsqueda
let campoBusqueda = document.getElementById('busqueda');
campoBusqueda.addEventListener('input', function() {
  mostrarInventario();
});




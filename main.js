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

   // Validar que los campos no estén vacíos
   if (nombre === '' || isNaN(cantidad) || isNaN(precioCompra) || isNaN(precioVenta)) {
    alert('Por favor, llene todos los campos antes de agregar el producto al inventario.');
    return; // Salir de la función sin agregar el producto
  }

  // Validar que el producto no exista en el inventario
  let productoExistente = inventario.find(function(producto) {
    return producto.nombre.toLowerCase() === nombre.toLowerCase();
  });

  if (productoExistente) {
    alert('Este producto ya existe en el inventario.');
    return; // Salir de la función sin agregar el producto
  }

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

  let textoBusqueda1 = document.getElementById('busqueda1').value.toLowerCase();

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
    
    // Agregar evento de escucha de clic a la fila
    fila.addEventListener('click', function() {
      mostrarVentanaEditarProducto(producto);
        });
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






//Funcion para mostrar la ventana de editar productos
function mostrarVentanaEditarProducto(producto){
  

  let ventana = document.createElement('div');
  ventana.id = 'ventana-editar-producto';
  document.body.appendChild(ventana);

// Crear el formulario
const formulario = document.createElement('form');

// Crear los elementos del formulario
const nombreLabel = document.createElement('label');
nombreLabel.setAttribute('for', 'nombre');
nombreLabel.textContent = 'Nombre:';

const nombreInput = document.createElement('input');
nombreInput.setAttribute('type', 'text');
nombreInput.setAttribute('id', 'nombre');
nombreInput.setAttribute('value', producto.nombre);

const cantidadLabel = document.createElement('label');
cantidadLabel.setAttribute('for', 'cantidad');
cantidadLabel.textContent = 'Cantidad:';

const cantidadInput = document.createElement('input');
cantidadInput.setAttribute('type', 'number');
cantidadInput.setAttribute('id', 'cantidad');
cantidadInput.setAttribute('value', producto.cantidad);

const precioCompraLabel = document.createElement('label');
precioCompraLabel.setAttribute('for', 'precio-compraa');
precioCompraLabel.textContent = 'Precio de compra:';

const precioCompraInput = document.createElement('input');
precioCompraInput.setAttribute('type', 'number');
precioCompraInput.setAttribute('id', 'precio-compraa');
precioCompraInput.setAttribute('step', "0.01");
precioCompraInput.setAttribute('value', producto.precioCompra);

const precioVentaLabel = document.createElement('label');
precioVentaLabel.setAttribute('for', 'precio-ventaa');
precioVentaLabel.textContent = 'Precio de venta:';

const precioVentaInput = document.createElement('input');
precioVentaInput.setAttribute('type', 'number');
precioVentaInput.setAttribute('id', 'precio-ventaa');
precioVentaInput.setAttribute('step', "0.01");
precioVentaInput.setAttribute('value', producto.precioVenta);

const botonSubmit = document.createElement('button');
botonSubmit.setAttribute('type', 'submit');
botonSubmit.textContent = 'Guardar cambios';

const botonCancelar = document.createElement('button');
botonCancelar.setAttribute('type', 'button');
botonCancelar.textContent = 'Cancelar';

// Agregar los elementos al formulario
formulario.appendChild(nombreLabel);
formulario.appendChild(nombreInput);
formulario.appendChild(cantidadLabel);
formulario.appendChild(cantidadInput);
formulario.appendChild(precioCompraLabel);
formulario.appendChild(precioCompraInput);
formulario.appendChild(precioVentaLabel);
formulario.appendChild(precioVentaInput);
formulario.appendChild(botonSubmit);
formulario.appendChild(botonCancelar);

ventana.appendChild(formulario);

  formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se recargue la página al hacer clic en el botón "Guardar cambios"

      // Validar campos de entrada
      const nombreValue = document.getElementById('nombre').value.trim();
      const cantidadValue = document.getElementById('cantidad').value.trim();
      const precioCompraValue = document.getElementById('precio-compraa').value.trim();
      const precioVentaValue = document.getElementById('precio-ventaa').value.trim();
  
      if (!nombreValue || !cantidadValue || !precioCompraValue || !precioVentaValue) {
        alert('Por favor, llene todos los campos antes de guardar los cambios.');
        return;
      }
  
      // Validar nombre del producto
      const nombreExistente = inventario.find(p => p.nombre.toLowerCase() === nombreValue.toLowerCase());
      if (nombreExistente && nombreExistente !== producto) {
        alert('Ya existe un producto con el mismo nombre. Por favor, elija un nombre diferente.');
        return;
      }

  producto.nombre = document.getElementById('nombre').value;
  producto.cantidad = parseInt(document.getElementById('cantidad').value);
  producto.precioCompra =parseFloat(document.getElementById('precio-compraa').value) ;
  producto.precioVenta = parseFloat(document.getElementById('precio-ventaa').value);  
  producto.ganancia = ((producto.precioVenta - producto.precioCompra) * producto.cantidad).toFixed(2); 
  ventana.remove(); // Ocultar la ventana emergente
  mostrarInventario(); // Actualizar la tabla de inventario

  console.log(producto.precioCompra);
  console.log(producto.nombre);
  console.log(producto.ganancia);
});

// Agregar evento click al botón de cancelar
botonCancelar.addEventListener('click', function() {
  ventana.remove(); // Ocultar la ventana emergente
});



}










let carrito = []; // Array para almacenar los productos seleccionados
let ventas = [];
let totalCompra = 0;

function agregarAlCarrito(producto) {

  // Agregar el producto al array del carrito
  let productoCarrito = {
    id: producto.id,
    nombre: producto.nombre,
    precioVenta: producto.precioVenta,
    cantidad: 1 // Establecer la cantidad inicial a 1
  };
  carrito.push(productoCarrito);


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
    
    // Actualizar el total de la compra
totalCompra = 0; // Inicializar el total en 0
carrito.forEach(function(producto) {
  totalCompra += producto.precioVenta * producto.cantidad;
});

// Insertar fila con el total de la compra si no existe
let filaTotal = tablaCarrito.querySelector(".total"); // Buscar la fila del total
if (!filaTotal) { // Si la fila del total no existe, crearla
  filaTotal = tablaCarrito.insertRow(); // Añadir una nueva fila al final de la tabla
  filaTotal.insertCell().colSpan = 2; // Añadir una celda que ocupe 2 columnas
  filaTotal.insertCell().textContent = "Total";
  filaTotal.insertCell().textContent = "$" + totalCompra.toFixed(2); // Añadir una celda con el total de la compra
  filaTotal.classList.add("total"); // Agregar una clase para identificar la fila del total
}
else { // Si la fila del total existe, actualizar su valor
  filaTotal.cells[2].textContent = "$" + totalCompra.toFixed(2); // Actualizar el valor de la celda del total de la compra
}

// Mover la fila del total al final de la tabla
tablaCarrito.appendChild(filaTotal);



  
    


    console.log(totalCompra);


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

let campoBusqueda1 = document.getElementById('busqueda1');
campoBusqueda.addEventListener('input', function() {
  mostrarInventario();
});




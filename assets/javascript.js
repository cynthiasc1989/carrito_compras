// Definición de las clases
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class ProductoEnCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    // Función para calcular el precio total 
    precioTotal() {
        return this.producto.precio * this.cantidad;
    }
}

// Definición de la clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    // Función para agregar productos al carrito
    agregarProducto(productoEnCarrito) {
        const index = this.productos.findIndex(p => p.producto === productoEnCarrito.producto);
        if (index > -1) {
            this.productos[index].cantidad += productoEnCarrito.cantidad;
        } else {
            this.productos.push(productoEnCarrito);
        }
        this.mostrarMensajeAgregado(productoEnCarrito);
    }

    // Función para calcular el total de la compra
    calcularTotal() {
        return this.productos.reduce((total, productoEnCarrito) => total + productoEnCarrito.precioTotal(), 0);
    }

    // Función para finalizar la compra
    finalizarCompra() {
        const total = this.calcularTotal();
        document.getElementById('detalles-compra').innerHTML += `<p>El total de la compra es $${total.toLocaleString('es-CL')}.</p>`;
        document.getElementById('boton-pagar').style.display = 'block';
    }

    // Función para mostrar los detalles de la compra
    mostrarDetalles() {
        const detallesCompra = document.getElementById('detalles-compra');
        detallesCompra.innerHTML = "<h2>Detalles de la compra:</h2>";
        this.productos.forEach(productoEnCarrito => {
            detallesCompra.innerHTML += `<p>Producto: ${productoEnCarrito.producto.nombre}, Cantidad: ${productoEnCarrito.cantidad}, Precio total: $${productoEnCarrito.precioTotal().toLocaleString('es-CL')}</p>`;
        });
    }

    // Función para mostrar mensaje de producto agregado
    mostrarMensajeAgregado(productoEnCarrito) {
        alert(`${productoEnCarrito.cantidad} ${productoEnCarrito.producto.nombre}(s) agregado(s) al carrito.`);
    }
}

// Lista de productos 
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Función para validar si el número del producto está en la lista de productos 
function validarProductoNumero(numero) {
    return productosDisponibles[numero - 1];
}

// Función para mostrar productos disponibles
function mostrarProductosDisponibles() {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}.- ${producto.nombre} $${producto.precio.toLocaleString('es-CL')}\n`;
    });
    alert(mensaje);
}

// Función principal para gestionar la compra
function gestionarCompra() {
    const carrito = new Carrito();
    let continuar = true;

    while (continuar) {
        mostrarProductosDisponibles();

        let numeroProducto = prompt("Ingrese el número del producto que desea agregar al carrito:");
        let producto = validarProductoNumero(numeroProducto);

        while (!producto) {
            numeroProducto = prompt("Producto no encontrado. Ingrese un número de producto válido:");
            producto = validarProductoNumero(numeroProducto);
        }

        let cantidadProducto = prompt(`Ingrese la cantidad de ${producto.nombre} que desea agregar al carrito:`);
        cantidadProducto = parseInt(cantidadProducto);

        while (isNaN(cantidadProducto) || cantidadProducto <= 0) {
            cantidadProducto = prompt(`Cantidad no válida. Ingrese una cantidad positiva para ${producto.nombre}:`);
            cantidadProducto = parseInt(cantidadProducto);
        }

        carrito.agregarProducto(new ProductoEnCarrito(producto, cantidadProducto));
        console.log(`Producto ${producto.nombre} agregado al carrito con cantidad ${cantidadProducto}.`);

        let respuesta = prompt("¿Desea seguir agregando productos? (s/n)").toLowerCase();
        while (respuesta !== 's' && respuesta !== 'n') {
            respuesta = prompt("Respuesta no válida. ¿Desea seguir agregando productos? (s/n)").toLowerCase();
        }
        continuar = respuesta === 's';
    }

    carrito.mostrarDetalles();
    carrito.finalizarCompra();
}

// Función para manejar el botón de pago
function manejarPago() {
    alert("¡Gracias por su compra!");
    window.location.href = "carrito_compras.html"; 
}

document.getElementById('iniciar-compra').addEventListener('click', gestionarCompra);
document.getElementById('boton-pagar').addEventListener('click', manejarPago);
document.getElementById('boton-pagar').style.display = 'none';

//Variables informativas
let productos = [];
let usuario;

//Variables para autentificacion de usuario
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let limpiarStorage;

//Variables para el formulario
let modalCotizarProducto;
let agregarProducto;
let formularioCotizador;
let inputTelefonoProducto;
let inputNombreProducto;
let inputCantidadProducto;
let inputPrecioProducto;
let contenedorProductos;
let btnCerrarModal;
let modal;

class Producto {
    constructor(id, telefono, nombre, cantidad, precio) {
        this.id = id;
        this.telefono = telefono;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    //Función para calcular el impuesto por producto
    calcularProducto = (cantidad, precio) => {
        return (cantidad * precio) * 1.18

    }
}

function inicializarElementos() {
    formularioIdentificacion = document.getElementById("formularioIdentificacion");
    inputClienteProducto = document.getElementById("inputClienteProducto");
    contenedorIdentificacion = document.getElementById("contenedorIdentificacion")
    contenedorUsuario = document.getElementById("contenedorUsuario");
    textoUsuario = document.getElementById("textoUsuario");
    limpiarStorage = document.getElementById("limpiarStorage");
    formularioCotizador = document.getElementById("formularioCotizador");
    inputTelefonoProducto = document.getElementById("inputTelefonoProducto");
    inputNombreProducto = document.getElementById("inputNombreProducto");
    inputCantidadProducto = document.getElementById("inputCantidadProducto");
    inputPrecioProducto = document.getElementById("inputPrecioProducto");
    contenedorProductos = document.getElementById("contenedorProductos");
    btnCerrarModal = document.getElementById("btnCerrarModal");
    agregarProducto = document.getElementById("agregarProducto");
    modalCotizarProducto = document.getElementById("modalCotizarProducto")
    modal = new bootstrap.Modal(modalCotizarProducto);
}

function inicializarEventos() {
    formularioCotizador.onsubmit = (event) => validarFormulario(event);
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    limpiarStorage.onclick = eliminarStorage;
    agregarProducto.onclick = abrirModalCotizarProducto;
    btnCerrarModal.onclick = cerrarModalCotizarProducto
}

function abrirModalCotizarProducto() {
    usuario ? modal.show() : alert("Identifíquese antes de agregar una nueva cotización")
}

function cerrarModalCotizarProducto() {
    formularioCotizador.reset()
    modal.hide()
}

function eliminarStorage() {
    localStorage.clear();
    usuario = "";
    productos = [];
    mostrarFormularioIdentificacion();
    pintarProductos();
}

function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputClienteProducto.value;
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    mostrarTextoUsuario();
}

function mostrarTextoUsuario() {
    contenedorIdentificacion.hidden = true;
    contenedorUsuario.hidden = false;
    textoUsuario.innerHTML += ` ${usuario}`;
}

function mostrarFormularioIdentificacion() {
    contenedorIdentificacion.hidden = false;
    contenedorUsuario.hidden = true;
    textoUsuario.innerHTML = ``;
}

function validarFormulario(event) {
    event.preventDefault();
    if (usuario) {
        let id = inputIdClienteProducto.value;
        let telefono = inputTelefonoProducto.value;
        let nombre = inputNombreProducto.value;
        let cantidad = parseInt(inputCantidadProducto.value);
        let precio = parseFloat(inputPrecioProducto.value);

        const idExiste = productos.some((producto) => producto.id === id);
        if (!idExiste) {
            let producto = new Producto(
                id,
                telefono,
                nombre,
                cantidad,
                precio
            );

            productos.push(producto);
            formularioCotizador.reset();
            actualizarProductosStorage();
            pintarProductos();
        } else {
            alert("El ID ya existe, por favor ingrese uno diferente");
        }
    } else {
        alert("Identifiquese antes de agregar un producto");
    }
}

function eliminarProducto(id) {
    let columnaBorrar = document.getElementById(`columna-${id}`);
    let indiceBorrar = productos.findIndex(
        (producto) => Number(producto.id) === Number(id)
    );

    productos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
    actualizarProductosStorage();
}

function pintarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
        let column = document.createElement("div");
        column.className = "col-md-3 mt-3";
        column.id = `columna-${producto.id}`;
        column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${producto.id}</b>
                </p>
                <p class="card-text">Telefono:
                <b>${producto.telefono}</b>
            </p>
                <p class="card-text">Producto:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Cantidad:
                    <b>${producto.cantidad}</b>
                </p>
                <p class="card-text">Precio:
                    <b>${producto.precio}</b>
                </p>
                <p class="card-text">Total:
                <b>${producto.cantidad*producto.precio*1.18}</b>
            </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                </div>
            </div>`;

        contenedorProductos.append(column);

        let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
        botonEliminar.onclick = () => eliminarProducto(producto.id);
    });
}

function actualizarProductosStorage() {
    let productosJSON = JSON.stringify(productos);
    localStorage.setItem("productos", productosJSON);
}

function actualizarUsuarioStorage() {
    localStorage.setItem("usuario", usuario);
}

function obtenerProductosStorage() {
    let productosJSON = localStorage.getItem("productos");
    if (productosJSON) {
        productos = JSON.parse(productosJSON);
        pintarProductos();
    }
}

function obtenerUsuarioStorage() {
    let usuarioAlmacenado = localStorage.getItem("usuario");
    usuarioAlmacenado = usuario && mostrarTextoUsuario()
}

function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerProductosStorage();
    obtenerUsuarioStorage();
}

main();
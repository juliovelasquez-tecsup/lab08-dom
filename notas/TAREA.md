# Tarea: Mi componente interactivo

## Componente elegido
Una lista de tareas donde el usuario puede agregar tareas, marcarlas como hechas y borrarlas.

## Codigo principal
```js
// Tarea: lista de tareas con clase, DOM y eventos
class Tarea {
  constructor(texto) {
    this.texto = texto;
    this.hecha = false;
  }

  alternar() {
    this.hecha = !this.hecha;
  }

  descripcion() {
    return (this.hecha ? "[x] " : "[ ] ") + this.texto;
  }
}

const formulario = document.querySelector("#formulario");
const texto = document.querySelector("#texto");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#lista");
const pendientes = document.querySelector("#pendientes");

const tareas = [];

function actualizarPendientes() {
  pendientes.textContent = tareas.filter((t) => !t.hecha).length;
}

function mostrarTarea(tarea) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = tarea.descripcion();

  const btnMarcar = document.createElement("button");
  btnMarcar.textContent = "Marcar";
  btnMarcar.addEventListener("click", () => {
    tarea.alternar();
    span.textContent = tarea.descripcion();
    li.classList.toggle("hecha", tarea.hecha);
    actualizarPendientes();
  });

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar";
  btnBorrar.addEventListener("click", () => {
    li.remove();
    tareas.splice(tareas.indexOf(tarea), 1);
    actualizarPendientes();
  });

  li.appendChild(span);
  li.appendChild(btnMarcar);
  li.appendChild(btnBorrar);
  lista.appendChild(li);
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const valor = texto.value.trim();
  if (valor === "") {
    mensaje.textContent = "Escribe una tarea antes de agregar";
    mensaje.classList.add("error");
    return;
  }

  mensaje.textContent = "";
  const tarea = new Tarea(valor);
  tareas.push(tarea);
  mostrarTarea(tarea);
  actualizarPendientes();
  texto.value = "";
});
```

## Pruebas realizadas
| Accion | Resultado esperado | Cumple (Si/No) |
|--------|--------------------|----------------|
| Escribir una tarea y presionar Agregar | La tarea aparece en la lista y Pendientes sube en 1 | Si |
| Presionar Agregar con el campo vacio | Mensaje de error en rojo y no se agrega nada | Si |
| Presionar Marcar en una tarea | La tarea se tacha, muestra [x] y Pendientes baja en 1 | Si |
| Presionar Borrar en una tarea | La tarea desaparece de la lista | Si |

## Por que disene asi mi clase
Elegí los atributos `texto` y `hecha` porque son lo mínimo que necesita la tarea. El método `alternar()` cambia el estado, y `descripcion()` arma el texto que se muestra en la lista, así cada objeto sabe cómo presentarse en la página.
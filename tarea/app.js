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

const lista = document.querySelector("#lista");

function mostrarTarea(tarea) {
  const li = document.createElement("li");
  li.textContent = tarea.descripcion();
  lista.appendChild(li);
}

const tareas = [
  new Tarea("Estudiar DOM"),
  new Tarea("Hacer el laboratorio 8")
];
tareas.forEach(mostrarTarea);
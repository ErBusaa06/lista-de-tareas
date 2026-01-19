const tareas = [];

function agregarTarea(nombre) {
    if (nombre.trim() === "") {
        alert("Por favor, ingrese una tarea válida");
        return;
    }
    
    const tarea = { nombre: nombre.trim(), completada: false };
    tareas.push(tarea);
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = '';

    if (tareas.length === 0) {
        lista.innerHTML = `
            <div class="estado-vacio">
                <div class="texto-estado-vacio">No hay tareas. ¡Agrega una para comenzar!</div>
            </div>
        `;
        return;
    }

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');

        const spanNombre = document.createElement('span');
        spanNombre.textContent = tarea.nombre;
        if (tarea.completada) {
            spanNombre.classList.add('completada');
        }

        const grupoBotones = document.createElement('div');
        grupoBotones.classList.add('grupo-botones');

        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = tarea.completada ? "✓ Completada" : "Completar";
        botonCompletar.classList.add('boton-completar');
        
        if (tarea.completada) {
            botonCompletar.disabled = true;
        }

        botonCompletar.onclick = () => marcarCompletada(index);
        grupoBotones.appendChild(botonCompletar);

        // Solo mostrar botón de eliminar si la tarea está completada
        if (tarea.completada) {
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add('boton-eliminar');
            botonEliminar.onclick = () => eliminarTarea(index);
            grupoBotones.appendChild(botonEliminar);
        }

        li.appendChild(spanNombre);
        li.appendChild(grupoBotones);
        lista.appendChild(li);
    });
}

function marcarCompletada(index) {
    tareas[index].completada = true;
    actualizarLista();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarLista();
}

document.getElementById('agregar').addEventListener('click', () => {
    const nuevaTarea = document.getElementById('nuevaTarea').value;
    agregarTarea(nuevaTarea);
    document.getElementById('nuevaTarea').value = '';
});

document.getElementById('nuevaTarea').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const nuevaTarea = document.getElementById('nuevaTarea').value;
        agregarTarea(nuevaTarea);
        document.getElementById('nuevaTarea').value = '';
    }
});

actualizarLista();
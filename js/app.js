// -------------------------- SELECTORES --------------------------
const form = document.querySelector('#form');
const result = document.querySelector('#result');

// -------------------------- EVENTOS --------------------------


window.onload = () => {
    form.addEventListener('submit', validate);    
}

// -------------------------- FUNCIONES --------------------------
function validate(event) {
    event.preventDefault();

    const terminoInput = document.querySelector("#termino").value;

    if(terminoInput.trim() === '') {
        showAlert('Error: Agregue un término de búsqueda.');
        return;
    }
}


// muestra alerta
function showAlert(msg) {
    const alert = document.createElement('P');
    alert.textContent = msg;
    alert.classList.add('alert');

    if(!result.querySelector('.alert')) {
        result.appendChild(alert);
    }

    setTimeout(() => {
        alert.remove();
    }, 3000)
}
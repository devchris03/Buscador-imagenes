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

    searchImages(terminoInput);
    form.reset();
}


// consulta api
function searchImages(termino) {
    const key = "47080193-968844eeb3e2617f32c8d5b3f";
    const apiURL = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    fetch(apiURL)
        .then(result => result.json())
        .then(result => showImages(result.hits))
}


// muestra imagenes
function showImages(images) {
    
    // borra resultados previos
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
    
    // itera resultados
    images.forEach(img => {
        const {downloads, largeImageURL, likes, previewURL, tags} = img;
        const imgContainer = document.createElement('ARTICLE');
        imgContainer.classList.add('imgContainer');
        imgContainer.tabIndex = "0";
        imgContainer.innerHTML = `
            <img src="${previewURL}" alt="Imagen relacionado con ${tags}">
            <div class="details">
                <p><span class="strong">${likes}</span> Me gusta</p>
                <p><span class="strong">${downloads}</span> Descargas</p>
            </div>
            <a href="${largeImageURL}" target="_blank" class="btn">Descargar</a>
        `;

        result.classList.add('grid');
        result.appendChild(imgContainer);
    })
    
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
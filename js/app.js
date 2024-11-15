// -------------------------- SELECTORES --------------------------
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const pagination = document.querySelector('#pagination');

// -------------------------- VARIABLES --------------------------
const n = 30;
let totalPage;
let iterador;

// -------------------------- EVENTOS --------------------------


window.onload = () => {
    form.addEventListener('submit', validate);    
}

// -------------------------- FUNCIONES --------------------------
function validate(event) {
    event.preventDefault();

    const terminoInput = document.querySelector("#termino").value;

    if(terminoInput.trim() === '') {
        clearHtml(result);

        if(result.classList.contains('grid')) {
            result.classList.remove('grid');
        }

        showAlert('Error: Agregue un término de búsqueda.');
        return;
    }

    searchImages(terminoInput);
    form.reset();
}


// consulta api
function searchImages(termino) {
    const key = "47080193-968844eeb3e2617f32c8d5b3f";
    const apiURL = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${n}`;

    fetch(apiURL)
        .then(result => result.json())
        .then(result => {
            totalPage = calculate(result.totalHits)
            showImages(result.hits)
        })
}


// muestra imagenes
function showImages(images) {
    clearHtml(result)

    if(images.length === 0) {
        if(result.classList.contains('grid')) {
            result.classList.remove('grid')
        }

        showAlert('Lo siento, no encontramos resultados');
        return;
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

    showPages()
    
}


// muestra paginadores
function showPages() {
    iterador = createGenerator(totalPage)

    while(true) {
        const {value, done} = iterador.next();
        
        if(done) return;

        const page = document.createElement('A');
        page.href = "#";
        page.textContent = value;
        page.dataset.pagima = value;
        page.classList.add('page');

        pagination.appendChild(page);
    }
}

// calcular paginación
function calculate(total) {
    return parseInt(Math.ceil(total / n));
}

// generador de páginas
function *createGenerator(total) {
    for(let i = 1; i <= total; i++){
        yield i;
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

// borra resultados previos
function clearHtml(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}
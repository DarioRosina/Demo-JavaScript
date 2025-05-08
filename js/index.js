function setTit(containerId, tit) {
    document.getElementById('titoloEs').innerHTML = tit
}

function toggleElementDisplay(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}

function nascondiElemento(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.style.display = 'none';
    }
}


function resetElemento(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.style.display = 'none';
        elemento.innerHTML = '';
    }
}


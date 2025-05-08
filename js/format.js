function setPos(containerId, top, left, rel) {
    const element = document.getElementById(containerId);
    if (!element) {
        console.error(`Elemento con ID "${containerId}" non trovato.`);
        return;
    }
    let myTop = top
    let myLeft = left
    if (typeof rel != 'undefined') {
        if (rel == 'rel') {
        myTop = topPrec + myTop
        myLeft = leftPrec + myLeft
        }
    }
    element.style.top = `${myTop}px`;
    element.style.left = `${myLeft}px`;
    topPrec = myTop
    leftPrec = myLeft
}

function _setupFormatElement(containerId) {
    const element = document.getElementById(containerId);
    if (!element) {
        console.error(`Elemento con ID "${containerId}" non trovato per la formattazione.`);
        return null;
    }
    element.classList.add('holdLog');
    return element;
}

/* -------------------------------------------------------------------------------- */

//rendering Array
function formatArrObj(containerId, arg, left, top, rel) {
    const element = _setupFormatElement(containerId);
    if (!element) return;

    if (Array.isArray(arg)) {
        const output = arg.map(el => {
            if (el && typeof el.name !== 'undefined' && typeof el.price !== 'undefined') {
                return `${el.name}  - ${el.price}`;
            }
            return 'Elemento non formattabile';
        }).join('<br>');
        element.innerHTML = output;
        setPos(containerId, top, left, rel);
    } else {
        element.innerHTML = 'Argomento non è un array valido.';
        setPos(containerId, top, left, rel); // Potrebbe essere utile posizionare anche il messaggio di errore
    }
}

function formatArrEasy(containerId, arg, left, top, rel) {
    const element = _setupFormatElement(containerId);
    if (!element) return;

    if (Array.isArray(arg)) {
        const output = arg.map(el => String(el)).join('<br>');
        element.innerHTML = output;
        setPos(containerId, top, left, rel);
    } else {
        element.innerHTML = 'Argomento non è un array valido.';
        setPos(containerId, top, left, rel);
    }
}

function formatObj(containerId, arg, left, top, rel) {
    const element = _setupFormatElement(containerId);
    if (!element) return;

    if (arg && typeof arg === 'object' && arg !== null && 'name' in arg && 'price' in arg) {
        element.innerHTML = `${arg.name}  - ${arg.price}`;
        setPos(containerId, top, left, rel);
    } else {
        element.innerHTML = `Oggetto non formattabile: ${String(arg)}`;
        setPos(containerId, top, left, rel);
    }
}

function format(containerId, arg, left, top, rel) {
    const element = _setupFormatElement(containerId);
    if (!element) return;

    element.innerHTML = `${String(arg)} (${typeof arg})`;
    setPos(containerId, top, left, rel)
}
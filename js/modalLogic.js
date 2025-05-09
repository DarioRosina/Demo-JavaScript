// Funzione dedicata all'esecuzione del codice e alla visualizzazione dei risultati
function executeAndDisplayResults(props) {
    const risultato1El = document.getElementById('risultato1');

    try {
        // Crea una funzione per eseguire il codice in modo isolato
        const executeCode = new Function(props.codeString + '; return typeof esito2 !== "undefined" ? [esito1, esito2] : [esito1];');
        const results = executeCode();
        const result1 = results[0];
        const result2 = results.length > 1 ? results[1] : undefined;

        // Mostra i risultati usando il formatter appropriato
        if (props.formatter && typeof props.formatter === 'function') {
            props.formatter("risultato1", result1, props.posX1, props.posY1);

            if (result2 !== undefined && props.posX2 >= 0) {
                props.formatter("risultato2", result2, props.posX2, props.posY2, props.posRel);
            }
        } else {
            console.error("Formatter non valido per:", props.title);
            if (risultato1El) {
                risultato1El.innerHTML = 'Errore: Formatter non valido.';
                risultato1El.style.display = '';
            }
        }
    } catch (error) {
        console.error(`Errore durante l'esecuzione del codice per "${props.title}":`, error);
        if (risultato1El) {
            risultato1El.innerHTML = `Errore nell'esecuzione: ${error.message}`;
            risultato1El.style.display = '';
        }
    }
}

// Funzione specifica per selettori.html: esegue il codice e gestisce la visibilità dell'output.
function executeAndDisplayOutput(props) {
    const risultato1El = document.getElementById('risultato1'); // Usato per messaggi di errore o output generico

    // Pulisci l'area di output principale (se necessario, o gestito da resetElemento)
    if (risultato1El) {
        risultato1El.innerHTML = '';
        risultato1El.style.display = 'none';
    }
    
    // Nascondi tutti i contenitori specifici prima di mostrare quello corretto
    // Questo potrebbe essere gestito anche in hidden.bs.modal o all'inizio di loadModalBase
    // ma lo mettiamo qui per chiarezza rispetto alla logica di selettori.html
    nascondiElemento('titolo1');
    nascondiElemento('titolo2');
    nascondiElemento('calcolo');
    nascondiElemento('metodi');
    nascondiElemento('listaImg');


    try {
        // Esegue il codice. In selettori.html, il codice manipola direttamente il DOM.
        const executeCode = new Function(props.codeString + ';');
        executeCode();

        // Dopo l'esecuzione, mostra il container specifico per questo esercizio
        if (props.containerRisultato) {
            const containerDaMostrare = document.getElementById(props.containerRisultato);
            if (containerDaMostrare) {
                containerDaMostrare.style.display = '';
            } else {
                console.warn(`Contenitore risultato "${props.containerRisultato}" non trovato.`);
            }
        }

    } catch (error) {
        console.error(`Errore durante l'esecuzione del codice per "${props.title}":`, error);
        if (risultato1El) {
            risultato1El.innerHTML = `Errore nell'esecuzione: ${error.message}`;
            risultato1El.style.display = '';
        }
    }
}

// Funzione base per caricare il contenuto del modal (titolo, codice)
// e chiamare un callback per gestire i risultati
function loadModalBase(props, displayResultsCallback) {
    propsCur = props; // Salva le props correnti per il toggle
    setTit("codice", props.title);

    const codeElement = document.getElementById('codice');
    const codeBlockContainer = codeElement ? codeElement.parentElement : null;
    if (codeElement && codeBlockContainer) {
        codeBlockContainer.classList.remove('show-code');
        codeElement.textContent = props.codeString.trim();
        Prism.highlightElement(codeElement, true, function() {
            setTimeout(() => {
                if (codeBlockContainer) {
                    codeBlockContainer.classList.add('show-code');
                }
            }, 10);
        });
    }

    // Pulisci i risultati precedenti e nascondili
    resetElemento('risultato1');
    resetElemento('risultato2');

    if (typeof displayResultsCallback === 'function') {
        displayResultsCallback(props);
    } else {
        console.error("displayResultsCallback non è una funzione valida.");
        const risultato1El = document.getElementById('risultato1');
        if (risultato1El) {
            risultato1El.innerHTML = 'Errore: Impossibile visualizzare i risultati.';
            risultato1El.style.display = '';
        }
    }
}
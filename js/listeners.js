if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impedisci al form di ricerca di fare il submit tradizionale
    });
}

function addListenerBtnEs(config) {
    const modalElement = document.getElementById('exampleModal');
    if (!modalElement) {
        console.error("Elemento modale #exampleModal non trovato.");
        return;
    }    
    const toggleButton = document.getElementById('toggleRisultato');
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            // propsCur è una variabile globale condivisa, impostata da loadModalBase
            if (typeof propsCur !== 'undefined' && propsCur) {
                config.onToggleButtonClick(propsCur);
            } else {
                console.warn("propsCur non definito o nullo al click del toggleButton.");
            }
        });
    } else {
        console.error("Bottone toggleRisultato non trovato.");
    }

    modalElement.addEventListener('show.bs.modal', function (event) {
        // event.relatedTarget è il bottone che ha attivato la modale
        const button = event.relatedTarget;
        if (button && button.id.startsWith('btnEs')) {
            const esIndex = parseInt(button.id.replace('btnEs', ''), 10);
            if (opzEs[esIndex]) {
                currentModalProps = opzEs[esIndex];
                loadModal(currentModalProps);
            } else {
                console.error(`Configurazione opzEs[${esIndex}] non trovata.`);
                // Opzionalmente, impedisci l'apertura della modale o mostra un errore
                // event.preventDefault(); // Se vuoi impedire l'apertura
            }
        } else if (currentModalProps) {
            // Fallback se la modale viene aperta in altro modo e currentModalProps è già impostato
            loadModal(currentModalProps);
        }
    });

    modalElement.addEventListener('hidden.bs.modal', function (event) {
        document.getElementById('titoloEs').innerHTML = '';
        const codeElement = document.getElementById('codice');
        if (codeElement) {
            codeElement.textContent = ''; // Pulisci il contenuto
            const codeBlockContainer = codeElement.parentElement;
            if (codeBlockContainer) {
                codeBlockContainer.classList.remove('show-code'); // Rimuovi la classe per la prossima volta
            }
        }
        propsCur = null;
        currentModalProps = null;

        // Esegui la callback di pulizia specifica della pagina
        if (typeof config.onModalHidden === 'function') {
            config.onModalHidden();
        }
    });

    // Ciclo per aggiungere event listener ai bottoni "demo"
    for (let i = 1; i <= config.numEs; i++) {
        const button = document.getElementById(`btnEs${i}`);
        if (button) {
            button.addEventListener("click", () => {
                if (config.opzEs[i]) {
                    currentModalProps = opzEs[i];
                } else {
                    console.error(`Configurazione opzEs[${i}] non trovata.`);
                }
            });
        } else {
            console.warn(`Bottone btnEs${i} non trovato.`);
        }
    }

}


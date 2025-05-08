function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('methodTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const searchTerm = searchInput.value.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const methodCell = row.cells[0]; // Colonna "Metodo"
        const descriptionCell = row.cells[1]; // Colonna "Descrizione"
        let match = false;

        if (methodCell && descriptionCell) {
            const methodText = methodCell.textContent || methodCell.innerText;
            const descriptionText = descriptionCell.textContent || descriptionCell.innerText;

            if (methodText.toLowerCase().includes(searchTerm) || descriptionText.toLowerCase().includes(searchTerm)) {
                match = true;
            }
        }
        row.style.display = match ? '' : 'none';
    }
}



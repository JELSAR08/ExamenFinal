document.addEventListener('DOMContentLoaded', function () {
    const categoria = "Cocktail";
    const url = `https://thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al realizar la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const cocteles = data.drinks || [];
            const listaCocktails = document.getElementById('cocktail-list');

            if (cocteles.length > 0) {
                cocteles.forEach(coctel => {
                    const listItem = document.createElement('li');
                    const imagen = document.createElement('img');
                    imagen.src = coctel.strDrinkThumb;
                    imagen.alt = coctel.strDrink;
                    listItem.appendChild(imagen);

                    const nombreCocktel = document.createElement('h2');
                    nombreCocktel.textContent = coctel.strDrink;
                    listItem.appendChild(nombreCocktel);

                    listaCocktails.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = `No se encontraron cócteles en la categoría '${categoria}'.`;
                listaCocktails.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
        });
});

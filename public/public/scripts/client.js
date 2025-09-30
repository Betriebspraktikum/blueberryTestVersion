'use strict';

// HTML-Formular selektieren
const form = document.querySelector('form');

// Für das Ereignis "Formulardaten absenden",
//   also Schaltfläche des Typs "submit" wurde geklickt,
//   eine Ereignisbehandlung beschreiben
form.addEventListener('submit', function(event) {
    // Schaltfläche, die angibt, ob per AJAX reagiert werden soll
    console.log('in eventListener');
    const checkbox = form.querySelector('[type="checkbox"]');

    document.querySelector('#rezension-modal').classList.remove('active');
    
    // true, wenn die Checkbox angeklickt/ausgewählt/aktiviert ist
    if (checkbox.checked) {

        // Browser-Standardverhalten unterdrücken -> wir reagieren per AJAX
        event.preventDefault();
        
        // Formulardaten selektieren
        const productName = form.querySelector('[name="productName"]').value;
        const author = form.querySelector('[name="author"]').value;
        const score = form.querySelector('[name="score"]').value;
        const description = form.querySelector('[name="description"]').value;

        // Daten für GET-/POST-Request bündeln
        const params = {
            productName,
            author,
            score,
            description
        }

        // Daten für GET-Request vorbereiten
        const query = new URLSearchParams(params).toString()
        const url = form.action + '?' + query;
        const options = {
            method: 'GET'
        }


        // Request abschicken -> then -> Callback für die Verarbeitung der Antwort
        fetch(url, options).then(response => {
            // Wenn HTTP-Status okay ist -> kein Fehlerfall eingetreten
            if (response.status === 200) {
                // Antwort als Text/HTML interpretieren -> then -> danach (*)
                return response.text();
            }
        // (*) Text-/HTML-Antwort verarbeiten
        }).then(html => {
            console.log("in html")
            // Liste selektieren, um die HTML-Antwort dort ranzuhängen
            const liste = document.querySelector('#reviewsContainer');
            // HTML der Liste um das vom Server erhaltene HTML ergänzen
            liste.innerHTML = html;
        })
    }
});
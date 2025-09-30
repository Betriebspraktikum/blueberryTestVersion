'use strict';

/**
 * Prüft, ob eine übergebene Zahl geradzahlig ist
 * @param {number} n - die Zahl, die geprüft werden soll
 * @return {boolean} true, wenn die Zahl gerade ist, andernfalls false
 */
function isEven(n) {
    return (n % 2) == 0;
}

/**
 * Liefert die Zahlen der Collatz-Folge.
 * > Eine Zahl wird halbiert, wenn sie gerade ist, ansonsten wird die Zahl * 3 + 1 gerechnet.
 * > Die Berechnung der Collatz-Folge kann abgebrochen werden, wenn die Zahl 1 erreicht wurde.
 * siehe auch Wikipedia: https://de.wikipedia.org/wiki/Collatz-Problem
 * @param {number} n - die Ausgangszahl, von der gehen wir aus
 * @param {number} amount - die Anzahl der Zahlen, die in der Folge berechnet werden sollen
 * @return {array} die Liste von Zahlen der Collatz-Folge.
 */
function createCollatz(n, amount) {
    let result = [];
    for (let i = 0; i < amount && n !== 1; i++) {
        if (isEven(n)) {
            n /= 2;
        } else {
            n = (n * 3) + 1;
        }
        result[i] = n;
    }
    return result;
}

/**
 * Berechnet für alle Zahlen, die zwischen lowerLimit und upperLimit liegen folgende Kennwerte:
 * - die Zahl selbst
 * - Angabe, ob die Zahl gerade ist
 * - max. die ersten vier Vorkommen der Collatz-Folge
 * Die Ergebnisse werden als Array zurückgegeben.
 * @param {number} lowerLimit - die untere Grenze, ab hier sollen die Kennwerte berechnet werden
 * @param {number} upperLimit - die obere Grenze, bis hier sollen die Kennwerte berechnet werden
 * @return {array} Das Array der Kennwerte, wobei jeder Array-Eintrag folgendes Format entspricht:
 *      {
 *          number: zahl selbst,
 *          isEven: true oder false
 *          collatz: [] (ein array von Zahlen)
 *      }
 */
function numberStats(lowerLimit, upperLimit) {
    let result = [];

    for (let n = lowerLimit; n <= upperLimit; n++) {
        result.push({
            number: n,
            isEven: isEven(n),
            collatz: createCollatz(n, 4)
        });
    }

    return result;
}

/**
 * Deklariere und Implementiere eine Funktion,
 *  die anhand eines übergebenen String-Wert
 *  einen anderen übergebenen String-Wert
 *  nach seinem Vorkommen hin untersucht.
 * Kommt der gesuchte Wert nicht vor,
 *  so gibt die Funktion false zurück,
 *  andernfalls true.
 * Die Suche ignoriert Groß-/Kleinschreibung.
 *
 * Sucht einen Substring in einem Text, ohne Groß-/Kleinschreibung zu beachten.
 * @param {string} text - der Text, in dem gesucht wird
 * @param {string} pattern - das gesuchte Muster
 * @return {boolean} true, wenn gefunden, sonst false
 */
function containsIgnoreCase(text, pattern) {
    if (typeof text !== 'string' || typeof pattern !== 'string') return false;
    return text.toLowerCase().includes(pattern.toLowerCase());
}

/**
 * Liefert den aktuellen Zeipunkt (Datum und Uhrzeit) zurück.
 * Das Ausgabeformat weicht vom Standardformat ab.
 * Die Konfiguration des Formats kannst du auf den Seiten von MDN nachlesen:
 *  > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
 *
 * Liefert den aktuellen Zeitpunkt im benutzerdefinierten Format zurück
 * @return {string} Datum und Uhrzeit z. B. in deutscher Formatierung
 */
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString('de-DE', {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}


/**
 * 
 */
document.addEventListener("DOMContentLoaded", function () {
    const scrollButton = document.querySelector(".scrollToTop");

    if (scrollButton) {
        scrollButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


/**
 * 
 */
function currentTime() {
    const today = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    document.getElementById("timeTag").textContent = today.toLocaleDateString("de-DE", options);
};

setInterval(currentTime, 1000);


/**
 * 
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("highlight-btn");

    btn.onclick = () => {
        const toggleApplied = document.querySelector(".cheapest");
        if (toggleApplied) {
            toggleApplied.classList.remove("cheapest");
            btn.textContent = "Preiswertes hervorheben";
            return;
        }

        const items = [...document.querySelectorAll(".product_item")];
        const cheapest = items.reduce(
            (min, it) => parseInt(it.dataset.price) < parseInt(min.dataset.price) ? it : min,
            items[0]
        );

        cheapest.classList.add("cheapest");
        btn.textContent = "Hervorhebung entfernen";
    };
});


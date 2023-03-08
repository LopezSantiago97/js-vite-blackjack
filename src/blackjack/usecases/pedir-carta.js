/**
 * Pide una carta al deck.
 * @param {Array<String>} deck El deck actual en juego.
 * @returns {String} Devuelve la carta del top del deck.
 */
export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0)
        throw 'No hay cartas en el deck.'

    return deck.pop();
}
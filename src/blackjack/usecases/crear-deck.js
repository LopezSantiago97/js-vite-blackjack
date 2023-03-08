import _ from 'underscore';

// export const miNombre = 'Santiago';


/**
 * Crea un deck y lo baraja.
 * @param {Array<String>} tipoDeCarta Ejemplo: ['C', 'D', 'H', 'S']
 * @param {Array<String>} cartasEspeciales Ejemplo: ['A', 'J', 'Q', 'K']
 * @returns {Array<String>} Devuevle el deck barajado con TODAS las cartas.
 */
export const crearDeck = (tiposDeCarta, cartasEspeciales) => {

    if (!tiposDeCarta || tiposDeCarta.length === 0)
        throw new Error('TiposDeCarta es obligatortio como un arreglo de string');

    if (!cartasEspeciales || cartasEspeciales.length === 0)
        throw new Error('cartasEspeciales es obligatortio como un arreglo de string');

    let deck = [];

    // Cartas normales (del 2 al 10)
    for (let i = 2; i <= 10; i++)
        for (let tipo of tiposDeCarta)
            deck.push(i + tipo);

    // Cartas especiales (As, Jota, Queen y King)
    for (let tipo of tiposDeCarta)
        for (let esp of cartasEspeciales)
            deck.push(esp + tipo);

    // Barajar Deck
    deck = _.shuffle(deck);
    return deck;

}

// export default crearDeck;
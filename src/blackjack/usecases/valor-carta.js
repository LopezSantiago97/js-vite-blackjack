/**
 * Recibe una carta y retorna cuantos puntos vale.
 * @param {string} carta Nombre de la carta.
 * @returns {number}  Valor de dicha carta.
 */
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return !isNaN(valor) ? valor * 1 : (valor === 'A') ? 11 : 10;
}
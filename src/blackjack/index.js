import _ from 'underscore';
import {crearDeck, pedirCarta, valorCarta} from './usecases'

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias HTML
    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const tableroCartas = document.querySelectorAll('.tableroCartas'),
        displayPuntos = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 1) => {
        deck = crearDeck(tipos, especiales);

        puntosJugadores = [];
        for (let i = 0; i <= numJugadores; i++) {
            puntosJugadores.push(0);
        }

        displayPuntos.forEach(elem => elem.innerText = 0);
        tableroCartas.forEach(elem => elem.innerHTML = '');

        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
        console.clear();
    }





    /**
     * Roba X cartas del deck.
     * @param {number} x 
     */
    const drawXCards = (x) => {
        for (let i = 0; i < x; i++)
            console.log(pedirCarta());

        console.log(deck);
    }



    /**
     * Turno: 0 = primer jugador, el ultimo sera la computadora
     */
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        displayPuntos[turno].innerText = String(puntosJugadores[turno]);
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        // Setup de la nueva carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        // Append de la nueva carta al tablero
        tableroCartas[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Empate.');
            } else if (puntosMinimos > 21) {
                alert('Gana la casa!');
            } else if (puntosComputadora > 21) {
                alert('Gana el jugador!');
            } else {
                alert('Gana la casa!')
            }
        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta(deck);
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }

    // eventos

    btnPedirCarta.addEventListener('click', () => {

        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Gana la casa!');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Gana el jugador!');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });


    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();
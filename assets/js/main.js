/*
permettre à ses comptables d'effectuer toutes sortes d'opérations mathématiques nécessaires à leur travail quotidien :
Opérations :
- de bases :
    - addition
    - soustraction
    - multiplication
    - division
- avancées :
    - Moyenne d'un ensemble de nombres
    - Calcul du pourcentage
--- --- ---
Début
Lire en entrée le(s) nombre(s) sélectionné(s)
Lire l'opération sélectionnée (+, -, x, /)
Si clique sur "=" remplacer la saisie par le résultat de l'opération
Si clique sur "clear" supprimer la saisie
*/

let saisie;
let nbElementsNbr = 0;
window.onload = _ => {
    saisie = document.querySelector('#input--saisie');
    let btn_clavier = document.querySelectorAll('#div--clavier button');

    btn_clavier.forEach(button => {
        if (button.getAttribute('data-number')) button.addEventListener("click", () => lireSaisie(button.getAttribute('data-number'), 'number'));
        if (button.getAttribute('data-operation')) button.addEventListener("click", () => lireSaisie(button.getAttribute('data-operation'), 'operation'));
        if (button.getAttribute('data-special')) button.addEventListener("click", () => lireSaisie(button.getAttribute('data-special'), 'special'));
    })
}

const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const addition = (a, b) => a + b;
const soustraction = (a, b) => a - b;

const clear = () => saisie.value = 0;
const off = () => saisie.value = "";

const egal = (calcul) => {
    let block = calcul.match(/[\d\.]+|\D+/g);

    console.log("[start]", block, block.length);
    let index_while = 0;
    while (block.length > 1) {
        index_while++;
        if (index_while > 3) break;

        for (let index = 0; index < block.length; index++) {
            element = block[index];

            if (element === "x" || element === "/" || element === "-" || element === "+") {
                if (element === "x") block[index] = multiplication(parseFloat(block[index - 1]), parseFloat(block[index + 1]));
                else if (element === "/") block[index] = division(parseFloat(block[index - 1]), parseFloat(block[index + 1]));
                else if (element === "-") block[index] = soustraction(parseFloat(block[index - 1]), parseFloat(block[index + 1]));
                else if (element === "+") {
                    block[index] = addition(parseFloat(block[index - 1]), parseFloat(block[index + 1]));
                }

                block[index - 1] = "_";
                block[index + 1] = "_";

                block = block.filter(value => value != "_");

                break;
            }
        }
    }
    console.log("[end]", block, block.length);

    return (isNaN(block[0])) ? "Error" : parseFloat(block[0]);
}

const moyenne = (saisie, total) => {
    let split = saisie.split('x').join(',').split('/').join(',').split('-').join(',').split('+').join(',').split(',');
    return total / split.length;
}

const lireSaisie = (laSaisie, type) => {
    if (saisie.value === "Error") off();
    if (saisie.value === "" && type === "operation") {
        saisie.value = `0${laSaisie}`;
    }
    else {
        if (saisie.value === "0" && type != "operation") off();
        if (laSaisie === "off") off();
        else if (laSaisie === "C") clear();
        else if (laSaisie === "=" || laSaisie === "M") {
            if (saisie.value.includes('%')) {
                let newValue;
                if (saisie.value.lastIndexOf('%') === saisie.value.length - 1) {
                    newValue = saisie.value.replaceAll('%', '/100');
                } else {
                    newValue = saisie.value.replaceAll('%', '/100x');
                }
                if (laSaisie === "M") saisie.value = moyenne(saisie.value, egal(newValue));
                else saisie.value = egal(newValue);
            } else {
                if (laSaisie === "M") saisie.value = moyenne(saisie.value, egal(saisie.value));
                else saisie.value = egal(saisie.value);
            }
        } else {
            saisie.value += laSaisie;
        }
    }
}
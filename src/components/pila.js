export function validacion(codigo) {
  let pila = ["$"];
  let contador = 0;
  let infoPila = [];

  pila[1] = "A";

  const pushInfo = (X) => {
    console.log("Push:", X);

    infoPila.push(`Push: ${X} -- ${codigo.slice(contador)}`);
  };

  const popInfo = (X) => {
    console.log("Pop:", X);
    infoPila.push(`Pop: ${X} --  ${codigo.slice(contador)}`);
  };

  while (pila.length > 0) {
    const X = pila.pop();

    console.log("X:", X);
    console.log("PILA:", pila);

    if (!X) {
      break;
    }

    const a = codigo[contador];
    console.log("a:", a);

    if (X === "$") {
      infoPila.push("FIN.");
      break;
    }

    if (X === a) {
      contador++;
    } else if (esNoTerminal(X)) {
      const produccion = obtenerProduccion(X, a);

      if (produccion) {
        pushInfo(X);
        if (produccion[0] !== "ε") {
          for (let i = produccion.length - 1; i >= 0; i--) {
            pila.push(produccion[i]);
          }
        }
      } else {
        infoPila.push(
          `ERROR: PRODUCCION NO VALIDA para ${X}.`
        );
        return { esValida: false, infoPila };
      }
    } else {
      popInfo(X);
      return { esValida: false, infoPila };
    }
  }

  return { esValida: contador === codigo.length, infoPila };
}

function esNoTerminal(simbolo) {
  const terminales = ["let", ";", "[", ",", "]"];
  return !terminales.includes(simbolo);
}

function obtenerProduccion(noTerminal, siguiente) {
  console.log("SIGUIENTE:", siguiente);

  const producciones = {
    A: ["T", "N", "M", ";"],
    T: ["l", "e", "t"],
    N: /[a-z]/.test(siguiente) ? ["L", "R"] : null,
    L: /[a-z]/.test(siguiente) ? [siguiente] : null,
    R: /[a-z]/.test(siguiente) ? ["L", "R"] : ["ε"],
    M: ["[", "E", "]"],
    E: ["D", "C", "X"],
    D: /[0-9]/.test(siguiente) ? [siguiente] : null,
    C: /[0-9]/.test(siguiente) ? ["D", "C"] : ["ε"],
    X: siguiente === "," ? [",", "D", "C", "X"] : ["ε"],
  };

  return producciones[noTerminal];
}
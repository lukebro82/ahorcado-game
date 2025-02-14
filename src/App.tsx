import { useEffect, useState } from "react";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getWord } from "./helpers/getWord";
import "./App.css";

function App() {
  const [lettersButtons, setLettersButtons] = useState(letters);
  const [word, setWord] = useState(getWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);
  const [letterPress, setPres] = useState("");

  // determinar si la persona perdio
  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts]);

  // determinar si la persona gano
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkhLetter = (letter: string) => {
    setLettersButtons((prevLetters) => prevLetters.filter((l) => l !== letter));
    if (lose) {
      return;
    } // si perdio no pueda seguir probando

    // mostrar las letras elegidas si no estan repetidas
    if (!letterPress.includes(letter)) {
      setPres(letterPress + letter);
    }

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    let hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getWord();

    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
    setPres("");
    setLettersButtons(letters);
  };

  return (
    <div className="App">
      {/* Imagenes  */}
      <HangImage imageNumber={attempts} />

      {/* Palabra Oculta */}
      <h3>{hiddenWord}</h3>

      {/* Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/* Letras Elegidas */}
      {<h3>Letras Elegidas:</h3>}
      {<h3>{letterPress}</h3>}

      {/* Mensaje si perdio */}
      {lose ? <h3>Perdiste... La palabra era: {word}</h3> : ""}

      {/* Mensaje si gano */}
      {won ? <h3>Ganaste!!!!!</h3> : ""}

      {/* Botones de letras*/}
      {lettersButtons.map((letter) => (
        <button
          key={letter}
          className="letter-button"
          onClick={() => checkhLetter(letter)}
        >
          {letter}
        </button>
      ))}

      <br />
      <br />
      <button className="newGame-button" onClick={() => newGame()}>
        Juego Nuevo
      </button>
    </div>
  );
}

export default App;

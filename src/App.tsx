import { useEffect, useState } from "react";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getWord } from "./helpers/getWord";
import { Win } from "./components/Win";
import { Lose } from "./components/Lose";

function App() {
  const [lettersButtons, setLettersButtons] = useState(letters);
  const [word, setWord] = useState(getWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

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
      setLose(false);
    }
  }, [hiddenWord]);

  const checkhLetter = (letter: string) => {
    setLettersButtons((prevLetters) => prevLetters.filter((l) => l !== letter));
    if (lose) {
      return;
    } // si perdio no pueda seguir probando

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
    setLettersButtons(letters);
  };

  return (
    <div className="App">
      {/* Imagenes  */}
      <HangImage imageNumber={attempts} />

      {/* Palabra Oculta */}
      <div className="hiddenWord">
        {" "}
        <h3>{hiddenWord}</h3>
      </div>

      {/* Contador de intentos */}
      <h3>Fallos: {attempts}</h3>

      {/* Mensaje si perdio */}
      {lose ? <Lose word={word} newGame={newGame} /> : ""}

      {/* Mensaje si gano */}
      {won ? <Win newGame={newGame} /> : ""}

      {/* Contenedor de letras */}
      <div className="letters-container">
        {lettersButtons.map((letter) => (
          <button
            key={letter}
            className="letter-button"
            onClick={() => checkhLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <br />
      <br />
      <button className="newGame-button" onClick={() => newGame()}>
        Juego Nuevo
      </button>
    </div>
  );
}

export default App;

import imageLose from "../assets/lose.jpg";

export const Lose = (props: any) => {
  return (
    <div className="loser">
      <div>
        {" "}
        <h1 className="win-title">PERDISTE!!!!</h1>
        <h3 className="lose-word">
          {" "}
          {"La palabra era: "}
          {props.word}{" "}
        </h3>
      </div>
      <div>
        <img src={imageLose} alt="win" />
      </div>
      <div>
        <button className="newGame-button" onClick={() => props.newGame()}>
          Juego Nuevo
        </button>
      </div>
    </div>
  );
};

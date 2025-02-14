import imageWin from "../assets/win.jpg";

export const Win = (props: any) => {
  return (
    <div className="winner">
      <div>
        {" "}
        <h1 className="win-title">GANASTE!!!!</h1>
        <h3 className="lose-word">{props.word}</h3>
      </div>
      <div>
        <img src={imageWin} alt="win" />
      </div>
      <div>
        <button className="newGame-button" onClick={() => props.newGame()}>
          Juego Nuevo
        </button>
      </div>
    </div>
  );
};

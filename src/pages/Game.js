import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";
import InputTxt from "../components/InputTxt";
import { randomWord } from "../Word.js";
import { Modal,Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Game extends React.Component {
  static defaultProps = {
    maxWrong: 9,
  };
  

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord().toUpperCase(),
      letter: "",
      show:false,
      username:""
    };
  }
  

  handleClose = () => {
    this.setState((st) => ({
      show: false
    }));
}
  handleShow = () => {
    this.setState((st) => ({
      show:true
    }));
}

  componentWillMount = () => {
    const name = this.props.match.params.name;
    this.setState((st) => ({
      username:name
    }));
    this.handleShow();
  }

  handleGuess = () => {
    let letter = this.state.letter;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
      letter: "",
    }));
  };

  guessedWord =()=> {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  resetButton = () => {
    const score = {
      username:this.state.username,
      score: 100-this.state.mistake*5
    }
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
      letter: "",
    });
   
    fetch('https://hollywood-arslaan.herokuapp.com/Player',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(score)
    }).then(()=>{
      console.log("success");
    })
  };
  updateLetter = (e) => {
    let val = e.target.value;
    this.setState({
      letter: val.toUpperCase(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;

    const isWinner = this.guessedWord().join("") === this.state.answer;

    let result = "";

    if (isWinner) {
      result = "Congratulation! you win the game.";
    }

    if (gameOver) {
      result = "You Lost!!! try again.";
    }

    return (
      <div className="Gamemain">
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ol>
                    <li>You have to guess names of famous movies.</li>
                    <li>You have 9 chances in total.</li>
                    <li>You should enter one letter at a time inside the given textbox.</li>
                    <li>Each wrong guess costs you one life.</li>
                    <li>When the lives run out the game ends</li>
                    
                    
                </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="HollyWood GameHeader">
          <div className="GametitleContainer">
            <h1 className="text-center">CS50: Hollywood</h1>
            Guesses used: {this.state.mistake} / {this.props.maxWrong}
          </div>
        </div>
        <div className="Gamecontainer">
          <p className="inputGuess">
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>

          <div className="guessContainer">
            <p style={{ fontSize: "24px" }}>Welcome to the game, {this.state.username}</p>
            <InputTxt
              placeholder="Enter letter"
              changeTxt={this.updateLetter}
              value={this.state.letter}
            />
            <div className="btnContainer" style={{ width: "100%" }}>
              <button className="button btn btn-primary" onClick={this.handleGuess}>
                Guess
              </button>
              <Link to="/">
              <button className="button btn btn-danger" onClick={this.resetButton}>
                Finish
              </button>
              </Link>
            </div>
          </div>
          {/* <button className="btn btn-info" onClick={this.resetButton}>
            Reset
          </button> */}
          <div>
            <h1>{result}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

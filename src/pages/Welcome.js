import React, { useState,useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";
import { Modal,Button } from 'react-bootstrap';
import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import InputTxt from "../components/InputTxt";

function Welcome() {
  const [score,setScore]= useState(null);
  useEffect(()=>{
    fetch("https://hollywood-arslaan.herokuapp.com/Player").then((result)=>{
      result.json().then((res)=>{
        console.log(res);
        setScore([...res.users]);
      })
    })
  },[])
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const setTxt = (event) => {
    setUserName(event.target.value);

  };

  return (
    <div className="main">
      {score? (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ScoreBoard</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div style={{display:"flex",justifyContent:"space-between"}}>
            <h1>Name</h1>
            <h1>Score</h1>
          </div>
          <hr></hr>
          {score.map(s=>(
            <div key={s._id} style={{display:"flex",justifyContent:"space-between"}}>
              <h1>{s.username}</h1>
              <h1>{s.score}</h1>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>):null}
      <div className="Header">
        <h1 className="headerTitle">CS50: HOLLYWOOD</h1>
      </div>
      <div className="container">
        <h2 className="welcometext"> Welcome</h2>
        <div className="inputContain">
          <InputTxt placeholder="Enter your name" changeTxt={setTxt} />
          <Link to={`/game/${userName}`}>
          <button className="btn btn-primary">
            <IoArrowForwardOutline className="icon" />
          </button>
          </Link>
        </div>
        <button className="scoreboard btn btn-success" onClick={handleShow}>ScoreBoard</button>
      </div>
    </div>
  );
}

export default Welcome;

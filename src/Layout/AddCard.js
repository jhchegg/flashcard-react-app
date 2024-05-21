import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  const [deckDetails, setDeckDetails] = useState({});
  const [notification, setNotification] = useState("");
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeckDetails(fetchedDeck);
      } catch (error) {
        console.error("Error fetching deck details", error);
      }
    }
    fetchDeck();
    return () => abortController.abort();
  }, [deckId]);

  const saveCard = async (deckId, card) => {
    const abortController = new AbortController();
    await createCard(deckId, card, abortController.signal);
    setNotification("Card added successfully!");
    setTimeout(() => setNotification(""), 500); 
  };

  const cancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deckDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AddCard">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{deckDetails.name}</Link> / Add Card
      </nav>
      <h2>Add Card</h2>
      <CardForm
        deckId={deckId}
        onSave={saveCard}
        onCancel={cancel}
        isEdit={false}
      />
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            zIndex: "1000",
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

export default AddCard;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function DeckDetails() {
  const [deckDetails, setDeckDetails] = useState(null);
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

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleDeleteDeck = async (deckId) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Delete this deck?\n\nYou will not be able to recover it."
        )
      ) {
        await deleteDeck(deckId, abortController.signal);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Delete this card?\n\nYou will not be able to recover it."
        )
      ) {
        await deleteCard(cardId, abortController.signal);
        setDeckDetails((prevDetails) => ({
          ...prevDetails,
          cards: prevDetails.cards.filter((card) => card.id !== cardId),
        }));
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  if (!deckDetails || !deckDetails.cards) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="DeckDetails"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "20px 0",
      }}
    >
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
          Home
        </Link>{" "}
        / {deckDetails.name}
      </nav>
      <h2 style={{ marginBottom: "20px" }}>{deckDetails.name}</h2>
      <p style={{ marginBottom: "20px" }}>{deckDetails.description}</p>
      <Link
        to={`/decks/${deckId}/edit`}
        style={{
          marginRight: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textDecoration: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        Edit
      </Link>
      <Link
        to={`/decks/${deckId}/study`}
        style={{
          marginRight: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textDecoration: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        Study
      </Link>
      <Link
        to={`/decks/${deckId}/cards/new`}
        style={{
          marginRight: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textDecoration: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        Add Cards
      </Link>
      <button
        onClick={() => handleDeleteDeck(deckId)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f8f9fa",
        }}
      >
        Delete
      </button>
      <h3 style={{ marginTop: "20px" }}>Cards</h3>
      {deckDetails.cards.map((card) => (
        <div
          key={card.id}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <p>{card.front}</p>
          <p>{card.back}</p>
          <Link
            to={`/decks/${deckId}/cards/${card.id}/edit`}
            style={{
              marginRight: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              textDecoration: "none",
              backgroundColor: "#f8f9fa",
            }}
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteCard(card.id)}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f8f9fa",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DeckDetails;

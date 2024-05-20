import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckListView({ deck, onDeleteDeck }) {
  const [deckDetails, setDeckDetails] = useState(deck);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deck.id, abortController.signal);
        setDeckDetails(fetchedDeck);
      } catch (error) {
        console.error("Error fetching deck details", error);
      }
    }
    if (!deckDetails) {
      fetchDeck();
    }

    return () => {
      abortController.abort();
    };
  }, [deck]);

  return (
    <div
      className="DeckListView"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginBottom: "20px",
      }}
    >
      <h2>{deck.name}</h2>
      <p>{deckDetails.cards.length} cards</p>
      <p>{deck.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={`/decks/${deck.id}`}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            textDecoration: "none",
            backgroundColor: "#f8f9fa",
            marginRight: "10px",
          }}
        >
          View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            textDecoration: "none",
            backgroundColor: "#f8f9fa",
            marginRight: "10px",
          }}
        >
          Study
        </Link>
        <button
          onClick={() => onDeleteDeck(deck.id)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f8f9fa",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckListView;

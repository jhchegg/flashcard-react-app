import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckListView from "./DeckListView";
import { listDecks, deleteDeck } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      try {
        const loadedDecks = await listDecks(abortController.signal);
        setDecks(loadedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    }

    fetchDecks();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleDeleteDeck = async (deckId) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Delete this deck?\n\nYou will not be able to recover it."
        )
      ) {
        await deleteDeck(deckId, abortController.signal);
        setDecks(decks.filter((deck) => deck.id !== deckId));
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  return (
    <div className="DeckList" style={{ padding: "20px" }}>
      <Link
        to="/decks/new"
        style={{
          display: "block",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textDecoration: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        Create Deck
      </Link>
      {decks.length > 0 ? (
        decks.map((deck) => (
          <DeckListView
            key={deck.id}
            deck={deck}
            onDeleteDeck={handleDeleteDeck}
          />
        ))
      ) : (
        <p>No decks available. Please create one.</p>
      )}
    </div>
  );
}

export default DeckList;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeckName(fetchedDeck.name);
        setDeckDescription(fetchedDeck.description);
      } catch (error) {
        console.error("Error fetching deck details", error);
      }
    }
    fetchDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleNameChange = (event) => {
    setDeckName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDeckDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      id: deckId,
      name: deckName,
      description: deckDescription,
    };

    try {
      const savedDeck = await updateDeck(newDeck);
      navigate(`/decks/${savedDeck.id}`);
    } catch (error) {
      console.error("Failed to update deck", error);
    }
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div className="EditDeck">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{deckName}</Link> / Edit Deck
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Deck Name</label>
          <input
            value={deckName}
            onChange={handleNameChange}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            value={deckDescription}
            onChange={handleDescriptionChange}
            placeholder="Brief description of the deck"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDeck;

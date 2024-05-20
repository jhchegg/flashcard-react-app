import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setDeckName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDeckDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      name: deckName,
      description: deckDescription,
    };

    try {
      const savedDeck = await createDeck(newDeck);
      navigate(`/decks/${savedDeck.id}`);
    } catch (error) {
      console.error("Failed to create deck", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="CreateDeck">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / Create Deck
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Deck Name</label>
          <input
            id="deckName"
            className="form-control"
            type="text"
            value={deckName}
            onChange={handleNameChange}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            id="deckDescription"
            className="form-control"
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

export default CreateDeck;

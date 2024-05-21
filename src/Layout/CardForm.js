import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardForm({
  deckId,
  card = { front: "", back: "" },
  onSave,
  onCancel,
  isEdit,
}) {
  const navigate = useNavigate();
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deckIdNumber = parseInt(deckId, 10); 
    const updatedCard = {
      ...card,
      front,
      back,
      id: card.id !== undefined ? card.id : null, 
    };
    console.log("Updated Card:", updatedCard);
    await onSave(deckIdNumber, updatedCard); 
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          className="form-control"
          value={front}
          onChange={handleFrontChange}
          placeholder="Enter text here"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          className="form-control"
          value={back}
          onChange={handleBackChange}
          placeholder="Enter text here"
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" type="submit">
          {isEdit ? "Submit" : "Save"}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleCancel}
        >
          {isEdit ? "Cancel" : "Done"}
        </button>
      </div>
    </form>
  );
}

export default CardForm;

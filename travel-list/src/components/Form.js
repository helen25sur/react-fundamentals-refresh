import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!description) return;

    const newItem = { description, amount, packed: false, id: Date.now() }
    onAddItems(newItem);
    setDescription("");
    setAmount(1);
  }

  return <form onSubmit={handleSubmit} className="add-form">
    <h3>What do you need for your 😍 trip?</h3>
    <select value={amount} onChange={(evt) => setAmount(+evt.target.value)}>
      {Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => <option value={i} key={i}>{i}</option>)}
    </select>
    <input type="text" name="" id="" placeholder="Item..." value={description} onChange={(evt) => setDescription(evt.target.value)} />
    <button>Add</button>
  </form>
}
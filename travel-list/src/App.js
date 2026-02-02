import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems(c => [...c, item]);
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleToggleItem = (id) => {
    setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return <div className="list">
    <ul>
      {items.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
    </ul>
  </div>
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats() {
  return <footer className="stats">
    <em>
      🎒 You have X items on your list, and you already packed X (X%)
    </em>
  </footer>
}

export default App;

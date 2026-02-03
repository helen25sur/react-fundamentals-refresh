import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const quantity = items.length;
  const quantityPacked = items.filter(item => item.packed).length;
  const percent = Math.round(quantityPacked / quantity * 100);

  const handleAddItems = (item) => {
    setItems(c => [...c, item]);
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleToggleItem = (id) => {
    setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats quantity={quantity} quantityPacked={quantityPacked} percent={percent} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return <div className="list">
    <ul>
      {sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
    </ul>

    <div className="actions">
      <select value={sortBy} onChange={evt => setSortBy(evt.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>

      <button onClick={onClearList}>Clear list</button>
    </div>
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

function Stats({ quantity, quantityPacked, percent }) {
  if (!quantity) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  return <footer className="stats">
    <em> {
      percent === 100 ? "You got everything! Ready to go ✈️" :
        `🎒 You have ${quantity} items on your list, and you already packed ${quantityPacked} (${percent}%)`
    }

    </em>
  </footer>
}

export default App;

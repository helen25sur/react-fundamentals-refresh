import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

export default App;

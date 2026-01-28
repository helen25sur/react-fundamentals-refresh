import './index.css';
import pizzaData from './data';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return <header className='header'>
    <h1>Fast React Pizza Co.</h1>
  </header>;
}

function Menu() {
  const pizza = pizzaData;
  const numPizza = pizza.length;

  return (
    <div className='menu'>
      <h2>Our Menu</h2>
      {numPizza > 0 ? <ul className='pizzas'>
        {pizzaData.map(item => {
          return (<Pizza key={item.name} pizza={item} />)
        })}
      </ul> : <p>We're still working on our menu. Please come back later :)</p>}
    </div>
  )
}

function Pizza({ pizza }) {
  return (
    <div className={`pizza  ${pizza.soldOut ? 'sold-out' : ''}`}>
      <img alt={pizza.name} src={pizza.photoName} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
      </div>

    </div>
  )
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className='footer'>
      {isOpen ? <Order closeHour={closeHour} /> :
        <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>
      }

    </footer>
  )
}

function Order({ closeHour }) {
  return <div className="order">
    <p>We're open until {closeHour}:00. Visit us or order online.</p>
    <button className='btn'>Order</button>
  </div>
}

export default App;

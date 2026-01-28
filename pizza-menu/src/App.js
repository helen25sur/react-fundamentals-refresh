import './index.css';

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
  return (
    <div className='menu'>
      <h2>Our Menu</h2>
      <Pizza />
    </div>
  )
}

function Pizza() {
  return (
    <div className='pizza'>
      <img alt="Pizza Spinaci" src="/pizzas/spinaci.jpg" />
      <h3>Pizza Spinaci</h3>
      <p>Tomato, mozarella, spinach, and ricotta cheese.</p>
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
    <footer className='footer'>{new Date().toLocaleTimeString()} We're currently open!</footer>
  )
}

export default App;

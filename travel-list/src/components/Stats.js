export default function Stats({ quantity, quantityPacked, percent }) {
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
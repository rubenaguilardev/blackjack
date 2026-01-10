import { useEffect, useState } from 'react'

const App = () => {
   
  const [game, setGame] = useState(
    {
      deckId: null,
      player : {
        status: 'active',
        hand: [],
        chipCount: 500,
      },
      dealerHand: [],
      gamePhase: 'not started',
      pot: 0
    }
  )

 useEffect(() => {
  fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(res => res.json())
    .then(data => {
      setGame(prev => ({
        ...prev, 
        deckId: data.deck_id
      }))
    })
 }, [])
  
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('/table.jpg')] bg-cover">
      <main className="container flex justify-center md:justify-start items-start mx-auto min-h-screen px-5 py-12">
        <img src="/logo.png" alt="blackjack logo" />
      </main>
    </div>
  )
}

export default App
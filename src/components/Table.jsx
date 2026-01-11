import { useState, useEffect } from "react"
import EmblaCarousel from "./carousel/EmblaCarousel"

const Table = () => {
 
const [game, setGame] = useState(
    {
        deckId: null,
        player : {
            status: 'active',
            hand: [],
            chipCount: 500,
            currentBet:0
        },
        dealerHand: [],
        gamePhase: 'not started',
        pot: 0
    }
)

const defaultChips = [
    {img:'/purple-chip.png', value: 25},
    {img:'/purple-chip.png', value: 25},
    {img:'/purple-chip.png', value: 25},
    {img:'/purple-chip.png', value: 25},
    {img:'/purple-chip.png', value: 25},
    {img:'/purple-chip.png', value: 25},
]

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
  
const handleChipClick = (chipValue) => {
    setGame(prev => ({
        ...prev,
        player: {
            ...prev.player,
            currentBet: prev.player.currentBet + chipValue
        }
    }))
}

const renderBetChip = (amount) => {
  
    let color = 'green'
    
    switch (amount) {
        case 1: color = 'white'; break
        case 5: color = 'blue'; break
        case 25: color = 'purple'; break
        case 50: color = 'orange'; break
        case 100: color = 'black'; break
        default: color = 'green'
    }
        return <div style={{ backgroundImage: `url(/${color}-chip.png)` }} className='h-26 w-26 flex justify-center items-center bg-contain'>
            <span 
                className="text-white text-3xl font-semibold"
                style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.8)' }}
            >
                ${amount}
            </span>
        </div>
        
}


return (
    <section className="flex">
        <div className="fixed bottom-40 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center items-center h-36 w-36 rounded-full border-2 border-white">
                <div className="flex justify-center items-center h-32 w-32 p-2 rounded-full border-2 border-white">
                    {game.player.currentBet ? renderBetChip(game.player.currentBet): <span className="text-white text-4xl">Bet</span>} 
                </div>
            </div>
        </div>
       
        <div className="fixed bottom-4 right-4">
            <EmblaCarousel slides={defaultChips} options={{ loop: true }} onChipClick={handleChipClick} />
        </div>
        
    </section>
)

}

export default Table
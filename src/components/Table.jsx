import { useState, useEffect } from "react"
import EmblaCarousel from "./carousel/EmblaCarousel"

const Table = () => {

const defaultChips = [
    {img:'/purple-chip.png', value: '$25'},
    {img:'/purple-chip.png', value: '$25'},
    {img:'/purple-chip.png', value: '$25'},
    {img:'/purple-chip.png', value: '$25'},
    {img:'/purple-chip.png', value: '$25'},
    {img:'/purple-chip.png', value: '$25'},
]
   
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
  
console.log(game)

return (
    <section>
        <div className="fixed bottom-4 right-4">
            <EmblaCarousel slides={defaultChips} options={{ loop: true }} />
        </div>
        
    </section>
)

}

export default Table
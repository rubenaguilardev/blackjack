// Request a deck of cards from card API
function main() {

    let deckId = ''
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

    document.querySelector('#play').addEventListener('click', deal)

    function deal() {
        let dealerCards = []
        let dealerTotal = 0
        let playerCards = []
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                if (data.remaining === 52) {
                    shuffle()
                }
                console.log(data)
                setTimeout(() => {
                    cardDealt()
                    document.querySelector('#playerCard1').src = data.cards[0].image}, 850)
                    playerCards.push(data.cards[0].value)
                setTimeout(() => {
                    cardDealt()
                    document.querySelector('#playerCard2').src = data.cards[1].image}, 1600)
                    playerCards.push(data.cards[1].value)
                setTimeout(() => {
                    cardDealt()
                    document.querySelector('#dealerCard1').src = data.cards[2].image}, 2600)
                    dealerCards.push(data.cards[2].value)
                setTimeout(() => {    
                    document.querySelector('#dealerCard2').src = "img/back.png"}, 3600)  
                document.querySelector('#stand').addEventListener('click', function () {
                    document.querySelector('#dealerCard2').src = data.cards[3].image
                    dealerCards.push(data.cards[3].value)
                    console.log(dealerCards)
                    dealerTotal = addCards(dealerCards)
                    console.log(dealerTotal)
                })      
        })
            .catch(err => {
                console.log(`error ${err}`)
            })
          
    }

    function cardDealt() {
        let dealtCard = new Audio("sounds/carddrop.mp3")
        dealtCard.play()
    }

    function shuffle() {
        let shuffle = new Audio("sounds/shuffle.mp3")
        shuffle.play()
    }

    function addCards(cards) {
        let total = 0
        cards.forEach(card => {
            if (card === 'ACE') {
                total += 11
            } else if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
                total += 10
            } else {
                total += Number(card)
            }
        })
        return total
   }

   

    }



main()
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
        let playerTotal = 0

        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                if (data.remaining === 52) {
                    shuffle()
                }

                setTimeout(() => {
                    cardDealtSound()
                    document.querySelector('#playerCard1').src = data.cards[0].image}, 850)
                    playerCards.push(data.cards[0].value)
                setTimeout(() => {
                    cardDealtSound()
                    document.querySelector('#playerCard2').src = data.cards[1].image}, 1600)
                    playerCards.push(data.cards[1].value)
                setTimeout(() => {
                    cardDealtSound()
                    document.querySelector('#dealerCard1').src = data.cards[2].image}, 2600)
                    dealerCards.push(data.cards[2].value)
                setTimeout(() => {    
                    document.querySelector('#dealerCard2').src = "img/back.png"}, 3600)  

                document.querySelector('#hit').addEventListener('click', function () {
                    drawCard()
                        .then(function (newCard) { 
                            if (document.querySelector('.playerCards').contains(document.querySelector('.nextCard'))) {
                                cardDealtSound()
                                let newCardImage = createCardImage(newCard.image)
                                let playerCardsContainer = document.querySelector('.playerCards')
                                let numCards = playerCardsContainer.children.length
                                let newLeft = numCards *65
                                newCardImage.style.left = `${newLeft}px`
                                playerCardsContainer.appendChild(newCardImage)
                                playerCards.push(newCard.value)
                                console.log(playerCards)
                            } else {
                                cardDealtSound()
                                let newCardImage = createCardImage(newCard.image)
                                document.querySelector('.playerCards').appendChild(newCardImage)  
                                playerCards.push(newCard.value)
                                console.log(playerCards)
                            }
                              
                        })
                        
                })

                // document.querySelector('#stand').addEventListener('click', function () {

                //     document.querySelector('#dealerCard2').src = data.cards[3].image
                //     dealerCards.push(data.cards[3].value)
                //     playerTotal = addCardTotal(playerCards)
                //     console.log(playerTotal)
                //     dealerTotal = addCardTotal(dealerCards)
                //     console.log(dealerTotal)
                //     if (dealerTotal < 17) {
                //         let card = drawCard()
                //         console.log(card)
                //     }
                // })      
        })
            .catch(err => {
                console.log(`error ${err}`)
            })
          
    }


    function cardDealtSound() {
        let dealtCard = new Audio("sounds/carddrop.mp3")
        dealtCard.play()
    }


    function shuffle() {
        let shuffle = new Audio("sounds/shuffle.mp3")
        shuffle.play()
    }


    function addCardTotal(cards) {
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


    function drawCard() {
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then(data => {
                return data.cards[0]
            })
    }

    function createCardImage(card) {
        let newCardImage = document.createElement('img')
        newCardImage.classList.add('nextCard')
        newCardImage.src = card
        return newCardImage
    }
}



main()
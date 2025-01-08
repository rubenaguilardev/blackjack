// Request a deck of cards from card API
let deckId = ''
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        console.log(deckId)
    })
    .catch(err => {
        console.log(`error ${err}`)
    })

document.querySelector('button').addEventListener('click', deal)

function deal() {
    let dealtCard = new Audio("sounds/carddrop.mp3")
    let shuffle = new Audio("sounds/shuffle.mp3")
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        .then(res => res.json())
        .then(data => {
            shuffle.play()

            setTimeout(() => {
                dealtCard.play()
                document.querySelector('#playerCard1').src = data.cards[0].image}, 850)
            setTimeout(() => {
                dealtCard.play()
                document.querySelector('#playerCard2').src = data.cards[1].image}, 1600)
            setTimeout(() => {
                dealtCard.play()
                document.querySelector('#dealerCard1').src = data.cards[2].image}, 2600)
            setTimeout(() => {
                
                document.querySelector('#dealerCard2').src = "img/back.png"}, 3600)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
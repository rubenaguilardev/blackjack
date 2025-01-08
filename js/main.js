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
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#playerCard1').src = data.cards[0].image
            document.querySelector('#playerCard2').src = data.cards[1].image
            document.querySelector('#dealerCard1').src = data.cards[2].image
            document.querySelector('#dealerCard2').src = "img/back.png"
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
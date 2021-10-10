fetch('https://random.dog/woof.json')
      .then( (data) => data.json())
      .then( (animal) => generateHTML(animal) )

const generateHTML = (data) => {
    console.log(data)
    const html = `
        <img src=${data.url}>
    `
    const catDiv = document.querySelector('.cat')
    catDiv.innerHTML = html
}

document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
        {
              name: 'dog',
              img: 'https://random.dog/2a99e070-ac7c-444f-9906-223338c4afee.jpg'
        },
  ]
        
      
  /*const cardArray = []
  for (let x = 0; x < 10; x++) {
        
      fetch('https://random.dog/woof.json')
            .then( (data) => data.json())
            .then( (animal) => addNewCard(animal) )

      const addNewCard = (data) =>
      {
          var newCard = { name: 'dog', img: data.url }
          console.log(newCard)
          cardArray.push(newCard)
          cardArray.push(newCard)
      }     
  }*/
  
  cardArray.sort(() => 0.5 - Math.random())
  console.log(cardArray)
  
  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenID = []
  var cardsWon = []
  
  function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
              var card = document.createElement('img')
              card.setAttribute('src', 'https://via.placeholder.com/150')
              card.setAttribute('data-id', i)
              card.addEventListener('click', flipCard)
              grid.appendChild(card)
        }      
  }
      
  //check for a match
  function checkForMatch() {
      var cards = document.querySelectorAll('img')
      const optionOneID = cardsChosenID[0]
      const optionTwoID = cardsChosenID[1]
      if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneID].setAttribute('src', 'https://www.canaryfoundation.org/wp-content/uploads/Gambhir-Symposium-NEW-Art-V2-Square-Aug-2021-150x150.png')
            cards[optionTwoID].setAttribute('src', 'https://www.canaryfoundation.org/wp-content/uploads/Gambhir-Symposium-NEW-Art-V2-Square-Aug-2021-150x150.png')
            cardsWon.push(cardsChosen)
      } else {
            cards[optionOneID].setAttribute('src', 'https://via.placeholder.com/150')
            cards[optionTwoID].setAttribute('src', 'https://via.placeholder.com/150')
            alert('Sorry, try again')
      }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You won!'
        }
  }
      
  //flip card
  function flipCard() {
        var cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenID.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)
        this.setAttribute('height', 150)
        this.setAttribute('width', 150)
        if(cardsChosen.length === 2) {
              setTimeout(checkForMatch, 500)
        }
  }
      
  createBoard()
      
})

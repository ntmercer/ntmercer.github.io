document.addEventListener('DOMContentLoaded', () =>
{
      const grid = document.querySelector('.grid')
      const resultDisplay = document.querySelector('#result')
      const movesDisplay = document.querySelector('#moves')
      const factDisplay = document.querySelector('#fact')
      resultDisplay.textContent = 0
      movesDisplay.textContent = 0
      var cardArray = []
      var cardsChosen = []
      var cardsChosenID = []
      var cardsWon = []
      var pictureApiUrl, factApiUrl, creatureType

      var creatureSelectForm = document.getElementById('creatureForm')
      creatureSelectForm.addEventListener('submit',function(event)
      {
            event.preventDefault()

            resultDisplay.textContent = 0
            movesDisplay.textContent = 0
            factDisplay.textContent = ""
            cardArray = []
            cardsChosen = []
            cardsChosenID = []
            cardsWon = []
            while(grid.firstChild)
                  grid.removeChild(grid.firstChild)

            configApi()
      })

      function configApi()
      {
            creatureType = document.getElementById("creatures").value
            if(creatureType == 'dog')
            {
                  pictureApiUrl = 'https://dog.ceo/api/breeds/image/random'
                  factApiUrl = 'https://some-random-api.ml/facts/dog'
            }
            else if(creatureType == 'cat')
            {
                  pictureApiUrl = 'https://cataas.com/cat?json=true'
                  factApiUrl = 'https://meowfacts.herokuapp.com'
            }
            else //must be koala
            {
                  pictureApiUrl = 'https://some-random-api.ml/animal/koala'
                  factApiUrl = 'https://some-random-api.ml/facts/koala'
            }
            buildCardArray()
      }

      function buildCardArray()
      {
            var indexes = []
            for (let x = 0; x < 20; ++x)
            {
                  indexes.push(x)
            }
            indexes.sort(() => 0.5 - Math.random())

            for (let x = 0; x < 10; ++x)
            {
                  fetch(pictureApiUrl)
                        .then(response =>
                              {
                                    return response.json()
                              })
                              .then(data => 
                              {
                                    var newCard
                                    if(creatureType == 'dog')
                                          newCard = {img: data.message, isFlipped: false}
                                    else if(creatureType == 'cat')
                                          newCard = {img: 'https://cataas.com' + data.url, isFlipped: false}
                                    else
                                          newCard = {img: data.image, isFlipped: false}
                                    cardArray[indexes[x]] = newCard
                                    cardArray[indexes[x+10]] = newCard
                                    console.log(newCard)
                              })
            }
            console.log(cardArray)
            createBoard()
      }
      
      function createBoard()
      {
            for (let i = 0; i < 20; i++)
            {
                  var card = document.createElement('img')
                  card.setAttribute('src', 'backofcard.jpg')
                  card.setAttribute('height', 150)
                  card.setAttribute('width', 150)
                  card.setAttribute('data-id', i)
                  card.addEventListener('click', flipCard)
                  grid.appendChild(card)
            }      
      }
            
      //check for a match
      function checkForMatch()
      {
            var cards = document.querySelectorAll('img')
            const optionOneID = cardsChosenID[0]
            const optionTwoID = cardsChosenID[1]
            if (cardsChosen[0] === cardsChosen[1])
            {
                  alert('You found a match')
                  cardsWon.push(cardsChosen)
            } else
            {
                  cards[optionOneID].setAttribute('src', 'backofcard.jpg')
                  cards[optionTwoID].setAttribute('src', 'backofcard.jpg')
                  cards[optionOneID].setAttribute('height', 150)
                  cards[optionTwoID].setAttribute('width', 150)
                  cards[optionOneID].setAttribute('height', 150)
                  cards[optionTwoID].setAttribute('width', 150)
                  cardArray[cardsChosenID[0]].isFlipped = false
                  cardArray[cardsChosenID[1]].isFlipped = false
                  alert('Sorry, try again')
            }
            cardsChosen = []
            cardsChosenID = []
            resultDisplay.textContent = cardsWon.length
            movesDisplay.textContent++
            if(cardsWon.length === cardArray.length/2)
            {
                  resultDisplay.textContent = 'Congratulations! You won!'
                  fetch(factApiUrl)
                        .then(response =>
                              {
                                    return response.json()
                              })
                              .then(data => 
                              {
                                    console.log(data)
                                    if(creatureType == 'cat')
                                    {
                                          factDisplay.textContent = data.data[0]
                                    }
                                    else
                                    {
                                          factDisplay.textContent = data.fact
                                    }
                              })
            }
      }
            
      //flip card
      function flipCard()
      {
            var cardID = this.getAttribute('data-id')
            if(!cardArray[cardID].isFlipped || (cardArray[cardID] === cardArray[cardsChosenID[0]] && cardID != cardsChosenID[0]))
            {
                  cardArray[cardID].isFlipped = true
                  cardsChosen.push(cardArray[cardID].img)
                  cardsChosenID.push(cardID)
                  this.setAttribute('src', cardArray[cardID].img)
                  this.setAttribute('height', 150)
                  this.setAttribute('width', 150)
                  if(cardsChosen.length === 2)
                  {
                        setTimeout(checkForMatch, 500)
                  }
            }
      }    
})
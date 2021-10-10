document.addEventListener('DOMContentLoaded', () =>
{
      var creatureType = 'dog'
      var pictureApiUrl, factApiUrl
      if(creatureType == 'dog')
      {
            pictureApiUrl = 'https://dog.ceo/api/breeds/image/random'
            factApiUrl = 'https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1'
      }
      else if(creatureType == 'cat')
            pictureApiUrl = 'https://cataas.com/cat?json=true'
      else
            pictureApiUrl = 'https://axoltlapi.herokuapp.com/'

      var indexes = []
      for (let x = 0; x < 20; ++x)
      {
            indexes.push(x)
      }
      indexes.sort(() => 0.5 - Math.random())

      var cardArray = []
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
                                    newCard = {img: data.message, isWon: false}
                              else if(creatureType == 'cat')
                                    newCard = {img: 'https://cataas.com' + data.url, isWon: false}
                              else
                                    newCard = {img: data.url, isWon: false}
                              cardArray[indexes[x]] = newCard
                              cardArray[indexes[x+10]] = newCard
                              console.log(newCard)
                        })
      }
      
      console.log(cardArray)
      
      const grid = document.querySelector('.grid')
      const resultDisplay = document.querySelector('#result')
      const movesDisplay = document.querySelector('#moves')
      const factDisplay = document.querySelector('#fact')
      resultDisplay.textContent = 0
      movesDisplay.textContent = 0
      var cardsChosen = []
      var cardsChosenID = []
      var cardsWon = []
      
      function createBoard()
      {
            for (let i = 0; i < 20; i++)
            {
                  var card = document.createElement('img')
                  card.setAttribute('src', 'https://via.placeholder.com/150')
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
                  cardArray[cardsChosenID[0]].isWon = true
                  cardArray[cardsChosenID[1]].isWon = true
                  cardsWon.push(cardsChosen)
            } else
            {
                  cards[optionOneID].setAttribute('src', 'https://via.placeholder.com/150')
                  cards[optionTwoID].setAttribute('src', 'https://via.placeholder.com/150')
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
                              factDisplay.textContent = data.fact
                        })
            }
      }
            
      //flip card
      function flipCard()
      {
            var cardID = this.getAttribute('data-id')
            if(!cardArray[cardID].isWon)
            {
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
            
      createBoard()
      
})

// Nathaniel Mercer - COMP 421 Final Project - Spring 2021 semester - Turned in 10/11/2021

document.addEventListener('DOMContentLoaded', () => //Run program as soon as website is loaded
{
      //Declare variables
      //Grid = grid tileset which holds cards
      const grid = document.querySelector('.grid')
      //Displays = show results to user of website
      const resultDisplay = document.querySelector('#result')
      const movesDisplay = document.querySelector('#moves')
      const factDisplay = document.querySelector('#fact')
      resultDisplay.textContent = 0
      movesDisplay.textContent = 0
      //Arrays = store cards or card info
      var cardArray = []
      var cardsChosen = []
      var cardsChosenID = []
      var cardsWon = []
      //API URL = stores the URL of the API used based on which creature is selected (creatureType)
      var pictureApiUrl, factApiUrl, creatureType

      //Once user presses "Start," begins program
      //Or, resets program if user chooses to "Reset"
      var creatureSelectForm = document.getElementById('creatureForm')
      creatureSelectForm.addEventListener('submit',function(event)
      {
            event.preventDefault()
            //Clear all data
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

      //Determines API URLs based off user creature selection
      function configApi()
      {
            creatureType = document.getElementById("creatures").value
            if(creatureType == 'dog')
            {
                  pictureApiUrl = 'https://dog.ceo/api/breeds/image/random'
                  factApiUrl = 'https://some-random-api.ml/facts/dog'
            }
            else //must be cat
            {
                  pictureApiUrl = 'https://cataas.com/cat?json=true'
                  factApiUrl = 'https://meowfacts.herokuapp.com'
            }
            buildCardArray()
      }

      //Set up the cards for the game in an array, for future reference
      function buildCardArray()
      {
            //Create a random order for cards to go in
            var indexes = []
            for (let x = 0; x < 20; ++x)
            {
                  indexes.push(x)
            }
            indexes.sort(() => 0.5 - Math.random())

            //Create cards and store them in an array based on the random order
            //Each card remembers the URL to get its image, and whether it is currently flipped or not
            //The URL is taken from the API, so it changes based on the animal selected by the user
            for (let z = 0; z < 10; ++z)
            {
                  fetch(pictureApiUrl)
                        .then(response =>
                              {
                                    return response.json()
                              })
                              .then(data => 
                              {
                                    let newCard
                                    if(creatureType == 'dog')
                                          newCard = {img: data.message, isFlipped: false}
                                    else //must be cat
                                          newCard = {img: 'https://cataas.com' + data.url, isFlipped: false}
                                    cardArray[indexes[z]] = newCard
                                    cardArray[indexes[z+10]] = newCard
                              })
            }
            console.log(cardArray)
            createBoard()
      }
      
      //Creates the actual card elements to be displayed on the webpage. Each one shows only the back of the card, for now.
      //Each card is assigned an event listener to attempt a flip when the card is clicked
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

      //Attempt a card flip. If the clicked card is already flipped over, nothing happens
      //If the card is NOT already flipped over, it will be flipped
      //The card's real image is loaded, and the program remembers it has been flipped
      //Finally, if 2 cards are flipped, after giving some time for the image to be retrieved from the internet, check for a match
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
                        setTimeout(checkForMatch, 600)
                  }
            }
      } 
            
      //Checks for a match. Compares the two flipped cards; if they have the same image, they are a match
      //If it's a match: Records the cards that have been won. They stay flipped over
      //If it's not a match: Flips the cards back over, so the back of the card is displayed again
      //Regardless of result, the score and moves are updated. If the player has won, a fact is retrieved from the proper URL
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
})
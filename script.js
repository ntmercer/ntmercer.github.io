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
        }
  ]
  
  const grid = document.querySelector('.grid')
  
  function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
              var card = document.createElement('img')
              card.setAttribute('src', 'https://via.placeholder.com/150')
              card.setAttribute('data-id', i)
              //card.addEventListener('click', flipcard)
              grid.appendChild(card)
        }      
  }
      
  createBoard()
      
})

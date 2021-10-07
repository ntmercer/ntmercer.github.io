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

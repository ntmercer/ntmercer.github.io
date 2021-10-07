function revealMessage()
{
  document.getElementById("hiddenMessage").style.display = 'block';
}

fetch(https://aws.random.cat/meow)
      .then( (data) => data.json())
      .then( (animal) => generateHTML(animal) )

const generateHTML = ( (data) => {
    console.log(data)
    const html = `
        <img src=${data.file}>
    `
    const catDiv = document.querySelector('.cat')
    catDiv.innerHTML = html
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Content Loading"
    messageTwo.textContent = ""
    
    const location = search.value
    fetchUrl = '/weather?address=' + encodeURIComponent(location)
    fetch(fetchUrl). then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                return messageOne.textContent = "Error: " + data.Error
            }
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
         })
    })
})


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
const messageThree = document.querySelector("#messageThree");
const messageFour = document.querySelector("#messageFour");




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'loading...';
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data)=> {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = "";
            messageTwo.textContent = "Forecast is " + data.forecast;
            messageThree.textContent = "Temperature is " + data.temperature + " Celsius";
            messageFour.textContent = "Location found is " + data.location;
            console.log(data.location);
            console.log(data.forecast);
            console.log(data);
        }

        search.value = "";
    })
})
    console.log('Testing');
})
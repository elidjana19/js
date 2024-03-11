const weatherForm= document.querySelector(".weatherForm");
const cityInput= document.querySelector(".cityInput");
const card= document.querySelector(".card")

const apikey="ea65326d86427642b6955d84aae455fd";

weatherForm.addEventListener("submit", async event=>{
    
    event.preventDefault();

    const city= cityInput.value;

     if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
     }
     else{
        displayError("please enter a city")
     }



})

async function getWeatherData(city){
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response= await fetch(url);
    
    if(!response.ok){
        throw new Error("Not a city");
    }
    return await response.json();  //data

}

function displayWeatherData(data){


    console.log(data)
    // object destructuring
    const {name: city,
           sys:{country},
           main:{temp, humidity, feels_like},
           weather:[{description, id}]} = data;
    
    card.textContent=""; //reset card text if any
    card.style.display="flex";

    const cityDisplay= document.createElement("h1");
    const tempDisplay= document.createElement("p");
    const feelsDisplay= document.createElement("p");
    const humidityDisplay= document.createElement("p");
    const descDisplay= document.createElement("p"); 
    

    cityDisplay.textContent=`${city} ${country}`;
    tempDisplay.textContent=`${(temp - 273.15).toFixed(0)} °C`;
    feelsDisplay.textContent= `But feels like: ${(feels_like - 273.15).toFixed(0)} °C`;
    humidityDisplay.textContent= `Humidity: ${humidity}%`;
    descDisplay.textContent= description.trim().charAt(0).toUpperCase() + description.trim().slice(1).toLowerCase(); //method chaining
    

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    feelsDisplay.classList.add("feelsDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsDisplay)
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

}

function displayError(ms){
    const p= document.createElement("p");
    p.textContent=ms;
    p.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(p);
}
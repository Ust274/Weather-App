
const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey ="1aacd869a1b8a2f9727e957d35bdb909";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

if(city){
    try{
    const weatherData = await getWeather(city);
    displayWeather(weatherData);
    }
    catch(error){
        console.error(error);
        getError(error);
    }
}
else
{
    getError("Please enter a valid city name!");
}
     

});


async function getWeather(city){

apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){

        throw new Error ("Unable to fetch data! ");
    }

return data = response.json();

}


function displayWeather(data){
     const {name:city,
       main:{temp,humidity}, 
        weather:[{description,id}]} = data;

    card.textContent="";
    card.style.display="flex";

    //Creation
    const displayCity = document.createElement("h1");
    const displayHu = document.createElement("p");
    const displayTemp = document.createElement("p");
    const displayDec = document.createElement("p");
    const displayEmoji = document.createElement("p");
    //assigning
    displayCity.textContent = city.toUpperCase();
    displayHu.textContent=`Humidity:${humidity}%`;
    displayTemp.textContent=`${(temp-273).toFixed(1)}°C`;
    displayDec.textContent=description.toUpperCase();
    const weatherId = id;
    displayEmoji.textContent=Emoji(weatherId);

    //appending
    card.appendChild(displayCity);
    card.appendChild(displayHu);
    card.appendChild(displayTemp);
    card.appendChild(displayDec);
    card.appendChild(displayEmoji);
    
    //applying css
    displayHu.classList.add("HuDisplay");
    displayTemp.classList.add("TempDisplay");
    displayDec.classList.add("DescDisplay");
    displayEmoji.classList.add("EmojiDisplay");


}


function Emoji(weatherId){
    switch(true){
    case (weatherId >= 200 && weatherId < 300 ):
    return "⛈️";
    case (weatherId >= 300 && weatherId < 400 ):
    return "💦";

    case (weatherId >= 500 && weatherId < 600 ):
    return "🌧️";

    case (weatherId >= 600 && weatherId < 700 ):
    return "❄️";

    case (weatherId >= 700 && weatherId < 800 ):
    return "🌫️";

    case (weatherId=== 800 ):
    return "☀️";
    case(weatherId>=801 && weatherId<805):
    return "☁️";

    default:
    return "😱";
    }

}

function getError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("ErrorDisplay");

    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
   


}
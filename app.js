window.addEventListener('load', () => {
    let lon;
    let lat;
    const tempDescription = document.querySelector(".temp-description");
    const tempDegree = document.querySelector(".temp-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const tempSection = document.querySelector(".temperature");
    const tempSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/d39a2ac220a29b51485ded1b41ba8e35/${lat},${lon}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //Set DOM Elements from API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // Formla for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    //Change temperature to Celsius/Fahrenheit on click
                    tempSection.addEventListener("click", () => {
                        if(tempSpan.textContent === "F") {
                            tempSpan.textContent = "C";
                            tempDegree.textContent = Math.round(celsius * 100) / 100;
                        } else {
                            tempSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                        }
                    });
                });
        });
    } else {
        h1.textContent = "Need to enable Geo Location!";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
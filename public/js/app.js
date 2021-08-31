var input = document.querySelector('form');
var search = document.querySelector('input');
var Message = document.querySelector('#message');
var mybut = document.querySelector("#myBtn");

input.addEventListener("submit", (e)=> {
    e.preventDefault(); 
    if (e.keyCode === 13 || e.which === 13) {
        mybut.click();        
    }
    const location = search.value; 
    Message.textContent="Loading..."

    fetch('/weather?address=' + encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                Message.textContent = "Alert! " + data.error;
            } else {
                const forecast1 ="Today's weather in " + data.info.location + " is " + data.info.weatherDescription + ". It is currently " + data.info.Temp + " degrees out. ";
                const timeDate = " The Date and Time as per the timezone at " + data.info.TimeZone+ " is " + data.info.DateTime;

                if (data.info.Temp!=data.info.FeelsLikeTemp) {
                        const forecast2 = " But it feels like " + data.info.FeelsLikeTemp + " degrees out."
                        const forecast3 = forecast1.concat(forecast2).concat(timeDate)
                        return Message.textContent = forecast3;
                }

                Message.textContent = forecast1.concat(timeDate);
            }
        });
    });         
});

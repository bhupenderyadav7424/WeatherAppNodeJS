const currDate = document.getElementById("date");
let weathercon = document.getElementById("weathercon");

const tempStatus = "{%tempStatus%}";

// condition to check sunny or cloudy
if(tempStatus == "Sunny") {
    weathercon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
}
else if(tempStatus == "Clouds") {
    weathercon.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
}
else if(tempStatus == "Rainy") {
    weathercon.innerHTML = "<i class='fas fa-rain' style='color: #a4b0be;'></i>";
}
else {
    weathercon.innerHTML = "<i class='fas fa-cloud' style='color: #44c3de;'></i>";
}

const getCurrentDay = () => {
    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    // console.log(day);
    return day;
};

const getCurrentTime = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var now = new Date();
    // var month = now.getMonth() + 1;
    var month = months[now.getMonth()];
    var date = now.getDate();
    // var year = now.getFullYear();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";
    if (hours > 11) {
        periods = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (mins < 10) {
        mins = "0" + mins;
    }

    // console.log(month + "/" + date);
    return `${month} ${date} | ${hours}:${mins} ${periods}`;
};

currDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
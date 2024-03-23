const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273).toFixed(2));
    temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min - 273).toFixed(2));
    temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max - 273).toFixed(2));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Alwar&appid=c59b6b39aa2e1cb95ab54757624bd085",
            // { streaming }
        )
            .on("data", (chunk) => {
                const objData = JSON.parse(chunk);
                const arrayData = [objData];
                // console.log(chunk);
                // console.log(objData);
                // console.log(arrayData[0].main.temp);

                // const realTimeData = arrayData.map((val) => {
                //     // console.log(val.main);
                //     replaceVal(homeFile, val);
                // }).join("");

                const realTimeData = arrayData.map((val) => replaceVal(homeFile, val)).join();

                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on("end", (err) => {
                if (err) return console.log("connection closed due to errors", err);

                // console.log("end");
                res.end();
            });
    }
});

server.listen(8000, "127.0.0.1");

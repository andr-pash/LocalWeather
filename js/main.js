$(document).ready(function () {

    // everything location based needs to be handled inside success fct
    function success(position) {
        var crd = position.coords;
        var lat = crd.latitude.toString().substr(0, 3);
        var lon = crd.longitude;
        var apiid = "4928c6319e3d7ec0666f116f54e39840";

        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiid;

        $.getJSON(url, function (json) {
            var temp = Math.floor(json.main.temp - 273);
            var humid = json.main.humidity;
            var tempMin = json.main.temp_min;
            var tempMax = json.main.temp_max;
            var wind = json.wind.speed; //conversion needed
            var name = json.name;
            var desc = json.weather[0].description;
            var code = json.weather[0].id;
            if (code < 800) {
                 var wcode = Math.floor(json.weather[0].id / 100);
            } else if(code === 800){
                var wcode = 8;
            } else if(code === 801 || code === 802){
                var wcode = 9;
            } else {
                var wcode = 10;
            }
            $("#location").html(name);
            $("#temp").html(temp);
            $("#wind").html(wind);
            $("#humid").html(humid);
            $("#discweather").html(desc);
            $("#discloc").html(name);
            
            // release overlay
            $(".overlay").addClass("hidden");
            console.log(json["sys"]);


            // toggle imperialistic/metric
            var toggle = true;
            $("#switch").click(function () {
                if (toggle) {
                    toggle = false;
                    var fahr = temp * (9 / 5) + 32;
                    $("#temp").html(fahr);
                    $("#unittemp").html(" °F");
                    var iwind = (wind * 1.9438444924574).toString().substr(0, 4);
                    $("#wind").html(iwind);
                    $("#unitwind").html(" kn");
                    $("#switch").html("Make Me Metric!");
                } else {
                    toggle = true;
                    $("#temp").html(temp);
                    $("#unittemp").html(" °C");
                    $("#wind").html(wind);
                    $("#unitwind").html(" m/s");
                    $("#switch").html("Imperialize Me!");

                }
            });


            // set background image depending on weather condition
            switch (wcode) {
                case 2:
                    $("body").addClass("thunder");
                    break;
                case 3:
                case 5:
                    $("body").addClass("rain");
                    break;
                case 6:
                    $("body").addClass("snow");
                    break;
                case 7:
                    $("body").addClass("fog");
                    break;
                case 8:
                    $("body").addClass("clearsky");
                    break;
                case 9:
                    $("body").addClass("partcloudy");
                    break;
                case 10:
                    $("body").addClass("cloudy");
                    break;
            }
        });


    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Location not available");
    }





});

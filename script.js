// create Tank 
function createTankCard(data, x) {
    var tankCard = document.createElement("DIV");
    tankCard.classList.add("tank-cards");

    var Id = document.createElement("DIV");
    Id.classList.add("id");
    var num = x+1;
    Id.innerText = num.toString(10);

    var location_desc = document.createElement("DIV");
    location_desc.classList.add("location-desc");
    location_desc.innerText = data.location;

    var tank_card_coordinates = document.createElement("DIV");
    tank_card_coordinates.classList.add("tank-card-coordinates");

    var style1cord = document.createElement("DIV");
    style1cord.classList.add("style1cord");

    var coordinate_label_lat = document.createElement("DIV");
    coordinate_label_lat.classList.add("coordinate-label");
    coordinate_label_lat.innerText = "Lat:";

    var coordinate_values_lat = document.createElement("DIV");
    coordinate_values_lat.classList.add("coordinate-values");

    coordinate_values_lat.innerText = Number.parseFloat(data.lat).toFixed(4);

    var coordinate_label_long = document.createElement("DIV");
    coordinate_label_long.classList.add("coordinate-label");
    coordinate_label_long.innerText = "Long:";

    var coordinate_values_long = document.createElement("DIV");
    coordinate_values_long.classList.add("coordinate-values");
    
    coordinate_values_long.innerText = Number.parseFloat(data.long).toFixed(4);

    var style2cord = document.createElement("DIV");
    style2cord.classList.add("style2cord");

    var tank_card_perc_full = document.createElement("DIV");
    tank_card_perc_full.classList.add("tank-card-perc-full");
    tank_card_perc_full.innerText = data.percentage_full.toString(10) +"%"


    tankCard.appendChild(Id);
    tankCard.appendChild(image);
    tankCard.appendChild(location_desc);

    style1cord.appendChild(coordinate_label_lat);
    style1cord.appendChild(coordinate_values_lat);
    style2cord.appendChild(coordinate_label_long);
    style2cord.appendChild(coordinate_values_long);
    tank_card_coordinates.appendChild(style1cord);
    tank_card_coordinates.appendChild(style2cord);
    tankCard.appendChild(tank_card_coordinates);

    tankCard.appendChild(tank_card_perc_full);

    return tankCard;
}

// POST request 
document.getElementById("addtank").addEventListener("click", function(event) {
    event.preventDefault();

    let Llocation = document.getElementById("TL").value;
    let Llat = document.getElementById("lat").value;
    let Llong = document.getElementById("long").value;
    let Lpercentage_full = document.getElementById("perc_full").value;

    let jsonBody = {
        location:Llocation,
        lat:Llat,
        long:Llong,
        percentage_full:Lpercentage_full,
    }

    fetch("http://localhost:3000/data" , {
        method: "POST",
        body:JSON.stringify(jsonBody),
        headers: {
            "Content-Type": "application/json",
        },
    })

        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            var c = document.getElementsByClassName("tanks")[0].childElementCount;
            console.log(c)
            document.getElementsByClassName("tanks")[0].appendChild(createTankCard(json, c));
        })
      
       

});


//GET request
fetch ("http://localhost:3000/data")
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        var i;
        for (i = 0; i < json.length ; i++) {
            document.getElementsByClassName("tanks")[0].appendChild(createTankCard(json[i], i))
        }
    })
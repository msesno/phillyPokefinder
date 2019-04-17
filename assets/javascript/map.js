// $(document).ready(function (){

    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('pokemap'), {
        zoom: 10,
        center: new google.maps.LatLng(39.952768, -75.163027),
        mapTypeId: 'roadmap'
        });
    }

    var source = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://discordapp.com/api/channels/563834169579405341/messages?limit=100",
        "method": "GET",
        "headers": {
        "Authorization": "Bot NTY1OTY1NDQ2MzkwNDgwOTA2.XLCe1w.ACa_D7B90zXvjjZ6ynfGt5GChwg",
        "cache-control": "no-cache",
        "Postman-Token": "8ad414b0-260c-43a8-add3-42e2f058d4e1",
            }
    }

    $.ajax(source).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {

            
            /* var stringArray = [];
            var nameString = response[i].embeds[0].fields[0].name;
            stringArray = nameString.split(" ", 9);
            stringArray.splice(6,1);
            stringArray.splice(1,1);
            var newArray = stringArray.splice(0,2);
            var newArray2 = stringArray.splice(3,5);
            var newCP = newArray2.join(": ");
            var newSL = stringArray.join(" ");
            var string2 = [];
            string2 = newSL.split("↵");
            
            var bigArray = newArray.concat(string2);
            
            bigArray.push(newCP); */

           /*  var pokemon = {
                Name: bigArray[0],
                Pic: thumbnail,
                Coords: [],
                IV: bigArray[1],
                CP: bigArray[4],
                Level: bigArray[3],
                Despawn: bigArray[2]
            }
            console.log(pokemon, i); */

            var pokeball = { 
                url: "assets/images/pokeball.svg",
                } 

          
           
            var coords = [];

            var coordigin = response[i].embeds[0].fields[2].value;
            var coordString = coordigin.slice(44, 78);
            var coordLat = coordString.slice(0,16);
            var coordLong = coordString.slice(17,34);
            coords.push(coordLong);
            coords.push(coordLat);

            let thumbnail = response[i].embeds[0].thumbnail.url;


            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: pokeball
                    });
                
            var infoWindow = new google.maps.InfoWindow({
            });
        
            marker.addListener("click",
            (function (marker, i) {
                return function (){
                    infoWindow.setContent(`

                        <div class="window">
                            <div class="thumbnail">
                                <img class="pict" src=${thumbnail}>
                            </div>

                        </div>
                                            `);
                    infoWindow.open(map, marker);
                }

            })(marker, i)

            );

        }
           
    });


// });
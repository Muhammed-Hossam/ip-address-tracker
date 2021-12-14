const apiKey = 'at_XVq4zjnhYSnGG6QLIMSwWhBXSEgPe';
const getRequestLink = `https://geo.ipify.org/service/account-balance?apiKey=at_xFhN9FYzdAJANzJQ8AjGhNhds0p31`
const id = 1130032
const accessToken = 'pk.eyJ1IjoibW9oYW1lZC1oYXJvdW4iLCJhIjoiY2tzeWVpZjF5MDF3cTJvbjB4NHE2Y2Y4YSJ9.6Du71Umt7O5E8rYp-F4khQ';
const submitBtn = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const IPRegex = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g
const domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi
var lat = 0;
var lng = 0;
const IPOutcome = document.querySelector('.ip-address .outcome');
const locationOutcome = document.querySelector('.location .outcome');
const timezoneOutcome = document.querySelector('.timezone .outcome');
const ispOutcome = document.querySelector('.isp .outcome');




$(function () {

    var IP = "";
    var domain = "";

    // Get client IP Address
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        IP = data.ip;

        $.ajax({
            url: "https://geo.ipify.org/api/v1", 
            data: {apiKey: apiKey, ipAddress: IP},
            success: function(data) {
                console.log(data);
                lat = data.location.lat;
                lng = data.location.lng;
                IPOutcome.textContent = data.ip;
                locationOutcome.textContent = data.location.country + ', ' + data.location.city;
                timezoneOutcome.textContent = data.location.timezone
                ispOutcome.textContent = data.isp;
                setMap(lat, lng);
            }
        });

    });
    

    // Get the input value when click on button
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Check if the value is an IP OR Domain.
        if (IPRegex.test(searchInput.value)) {
            
            IP = searchInput.value;
            domain = "";

            if (IP !== "") {
        
                $.ajax({
                    url: "https://geo.ipify.org/api/v1", 
                    data: {apiKey: apiKey, ipAddress: IP},
                    success: function(data) {
                        console.log(data);
                        lat = data.location.lat;
                        lng = data.location.lng;
                        IPOutcome.textContent = data.ip;
                        locationOutcome.textContent = data.location.country + ', ' + data.location.city;
                        timezoneOutcome.textContent = data.location.timezone
                        ispOutcome.textContent = data.isp;
                        setMap(lat, lng);
                    }
                });
                
            }

        }else if (domainRegex.test(searchInput.value)){
            console.log('This is Domain Name!');
            domain = searchInput.value;
            IP = "";

            if (domain !== "") {
        
                $.ajax({
                    url: "https://geo.ipify.org/api/v1", 
                    data: {apiKey: apiKey, domain: domain},
                    success: function(data) {
                        console.log(data);
                        lat = data.location.lat;
                        lng = data.location.lng;
                        IPOutcome.textContent = data.ip;
                        locationOutcome.textContent = data.location.country + ', ' + data.location.city;
                        timezoneOutcome.textContent = data.location.timezone
                        ispOutcome.textContent = data.isp;
                        setMap(lat, lng);
                    }
                });
        
            }

        } 
    
    
    
    });


});




// Setup the Map    
function setMap(lats, lngs) {

    
    // check if the map is already initiated or not.
    var container = L.DomUtil.get('mapid');
      if(container != null){
        container._leaflet_id = null;
    }
    
    var mymap = L.map('mapid').setView([lats, lngs], 13);

    mymap.invalidateSize();

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
    }).addTo(mymap);
    
    
    var myIcon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [38, 55],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    
    L.marker([lats, lngs], {icon: myIcon}).addTo(mymap);



}

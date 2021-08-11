mapboxgl.accessToken = 'pk.eyJ1IjoiYWZhcmVuY2UiLCJhIjoiY2tpaWNmZXNrMGF1bzJzcW1uMGRiZnRpbCJ9.uopR-f-9VC4hwT7aEGQpxg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/afarence/ckry8lla501k217s132e0j3pc',
    zoom: 3.5,
    center: [-95, 40.725]
});
map.on('load', function(){
    // This is the function that finds the first symbol layer
    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    
    map.addLayer({
        'id':'HSdata',
        'type':'fill',
        'source': {
            'type':'geojson',
            'data':'hs_data.geojson'
        },
        'paint':{
            'fill-color':'#00FF00',
            'fill-opacity': ['interpolate',['linear'],['get','Total_Num_of_students'],
1000000,0.25,
100000000,0.75]
//            'fill-opacity': .25

        }
    }, firstSymbolId);
})

// Create the popup
map.on('click', 'HSdata', function (e) {
    var entriesDiff = e.features[0].properties.Total_Num_of_students;
    var stateName = e.features[0].properties.NAME;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>' + stateName + '</h2>' +  '<h3>' +  entriesDiff.toLocaleString() + ' Students' + '</h3>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'HSdata', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'HSdata', function () {
    map.getCanvas().style.cursor = '';
});

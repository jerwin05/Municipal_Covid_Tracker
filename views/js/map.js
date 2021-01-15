window.onload=init;
function init(){

    const newCaseAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/new-cases' : 'https://teresa-covid-tracker.herokuapp.com/new-cases';

    const map= new ol.Map({
        view:new ol.View({
            projection:'EPSG:4326',
            center:[121.2071937966153, 14.559724584263174],
            zoom:16,
            maxZoom:18,
            minZoom:12,
            // extent: [minx, miny, maxx, maxy]
            extent: [115.73596754571534,4.342163340984037,129.2297322655699, 21.54980825896372],
        }),
        target:'js-map'
    });

    //basemaps 
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible:true,
        title:'OSMStandard'
    });

    map.addLayer(openStreetMapStandard);
    
    //--------------------------------------------------------------------------------------------------------------------------------------

    // vector layers
    const strokeStyle=new ol.style.Stroke({
        color:'#F4A647',
        width:2
    });

    const teresaGEOJSON= new ol.layer.Vector({
        source: new ol.source.Vector({
            url:'./data/vector data/map.geojson',
            format: new  ol.format.GeoJSON()
        }),
        visible:true,
        title:'teresaBoundaries',
        style: new ol.style.Style({
            stroke:strokeStyle
        })
    });

    map.addLayer(teresaGEOJSON);

    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#ffffff'
            }),
            stroke: new ol.style.Stroke({
                color: '#f5b461',
                width: 5
            }),
          }),
        text: new ol.style.Text({
            font: 'bold 0px "Open Sans"',
        }),
    });

    var styleFunction = (feature)=> {
        style.getText().setText(feature.get('barangay'));
        return style;
    }

    var geojsonObject = 
        {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [
            {
                "type": "Feature",
                "properties": {
                "barangay": "poblacion",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.20279474536595,
                      14.562156334590009
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "prinza",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.21395056628894,
                      14.539799266351995
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "san roque",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.21470582252093,
                      14.552316640672384
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "dalig",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.23115009659746,
                      14.571688019526668
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "calumpang sto cristo",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.20648581495578,
                      14.559188461392802
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "dulumbayan",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.20526272764499, 
                      14.557858085721415
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "may-iba",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.20660826975435, 
                      14.56445688154543
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "san gabriel",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.21130713152817,
                      14.556701591311798
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                "barangay": "bagumbayan",
                "newCaseCount":0
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                      121.21864030611829,
                      14.550742524657448
                    ]
                }
            }
        ]
    };

    //vector feature popup logic
    const overlayContainerElement=document.getElementById('mapOverlay');
    const overlayNewCaseCount=document.getElementById('overlayNewCaseCount');
    const overlayNewCaseCountBarangay=document.getElementById('overlayNewCaseCountBarangay');
    
    const overlayLayer= new ol.Overlay({
        element:overlayContainerElement
    })
    
    map.addOverlay(overlayLayer);

    map.on('click',(e)=>{
        overlayLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel,(feature,layer)=>{
            let clickedCoordinate=e.coordinate;
            let clickedFeatureBarangay=feature.get('barangay');
            let clickedFeatureNewCaseCount=feature.get('newCaseCount');
            overlayLayer.setPosition(clickedCoordinate);
            overlayNewCaseCountBarangay.innerHTML=clickedFeatureBarangay;
            overlayNewCaseCount.innerHTML=clickedFeatureNewCaseCount;
        },
        {
            layerFilter:function (layerCandidate){
                return layerCandidate.get('title') ==='newCase'
            }
        });
    });

    
    //--------------------------------------------------------------------------------------------------------------------------------------

    const newCaseLayer = geojsonObject.features;

    const getNewCases=()=>{
        fetch(newCaseAPI_URL)
        .then(response=>{
            response.json()
            .then(result=>{
                result.forEach(count=>{
                    newCaseLayer.forEach(count1=>{
                        if(count.barangay==count1.properties.barangay){
                            count1.properties.newCaseCount=count1.properties.newCaseCount+1;
                        }
                    })
                })
                
                var vectorSource = new ol.source.Vector({
                    features: new ol.format.GeoJSON().readFeatures(geojsonObject)
                });

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: styleFunction,
                    title:'newCase'
                });
                
                map.addLayer(vectorLayer); 
            });
        });
    }

    getNewCases();

    // map.addLayer(stamenTerrain); // call a single layer

    // map.on('click',function(e){
    //     console.log(e.coordinate);// logs coordinates from the location clicked
    // }) 
};
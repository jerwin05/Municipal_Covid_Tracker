window.onload=init;
function init (){
  const button=document.querySelector('#refresh');
  const residentPositiveCoordinatesAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/positive-coordinates' : 'https://meower-api.now.sh/v2/mews';
  const map= new ol.Map({
      view:new ol.View({
          center:[121.21432681865336,14.5564078852835],
          // center:[0,0],
          projection:'EPSG:4326',
          zoom:15,
          // maxZoom:7,
          // minZoom:4,
          // rotation:0.5
      }),
      target:'js-map'
  });

  //basemaps 
  const openStreetMapStandard = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible:true,
      title:'OSMStandard'
  });

  const openStreetMapHumanitarian= new ol.layer.Tile({
      source:new ol.source.OSM({
          url:'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      }),
      visible:false,
      title:"OSMHumanitarian"
  });

  const baseLayerGroup= new ol.layer.Group({
      layers:[
          openStreetMapStandard,
          openStreetMapHumanitarian,
      ]
  });

  map.addLayer(baseLayerGroup);

  //layer switcher logic for basemaps
  const baseLayerElements=document.querySelectorAll('.map-layer >input[type=radio]');
  for (let baseLayerElemet of baseLayerElements){
      baseLayerElemet.addEventListener('change',function(){
          let baseLayerElementValue =this.value;
          baseLayerGroup.getLayers().forEach((element,index,array)=>{
              let baseLayerTitle=element.get('title');
              element.setVisible(baseLayerTitle === baseLayerElementValue);
          });
      });
  };

  //----------------------------------------------------------------------------------------------------------------------------

  var styles = {
    'GeometryCollection': new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color:'orange'
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
        })
      })
    })
  };

  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
  };

  var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:4326',
      },
    },
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'GeometryCollection',
          'geometries': []
        },
      }],
  };

  var vectorSource = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(geojsonObject)
  });

  function callvector(){
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction,
    });
    map.addLayer(vectorLayer); 
  }

  function getPositiveResidentCoordinates(){
    geojsonObject.features[0].geometry.geometries=[];
    fetch(residentPositiveCoordinatesAPI_URL,{
    }).then(response=>{
      response.json().then(result=>{
        if(result.length){
          result.forEach((coordinates)=>{
            let newPoint={
              'type':'Point',
              'coordinates':[coordinates.longitude,coordinates.latitude]
            };    
            geojsonObject.features[0].geometry.geometries.push(newPoint);
          });
          vectorSource.clear();
          vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(geojsonObject)
          });
          callvector();
        }
        else{
          vectorSource.clear();
          callvector();
        }
      });
    });
  }
  getPositiveResidentCoordinates();

  button.addEventListener('click',()=>{
    getPositiveResidentCoordinates();
    button.textContent='Refreshed';
    setTimeout(()=>{
      button.textContent='Refresh';
    },1000)
  });

  //--------------------------------------------------------------------------------------------------------------------------------------

  // // vector layers
  // const fillStyle= new ol.style.Fill({
  //     color:[84,118,225,1]
  // });

  // const strokeStyle=new ol.style.Stroke({
  //     color:[46,45,45,1],
  //     width:1.2
  // });

  // const circleStyle= new ol.style.Circle({
  //     fill: new ol.style.Fill({
  //         color:[245,49,5,1]
  //     }),
  //     radius:7,
  //     stroke:strokeStyle
  // });

  // const antipoloGeojson= new ol.layer.VectorImage({
  //     source: new ol.source.Vector({
  //         url:'./data/vector data/map.geojson',
  //         format: new  ol.format.GeoJSON()
  //     }),
  //     visible:true,
  //     title:'antipoloSquare',
  //     style: new ol.style.Style({
  //         fill:fillStyle,
  //         stroke:strokeStyle,
  //         image:circleStyle
  //     })
  // });

  // map.addLayer(antipoloGeojson);

  // //vector feature popup logic
  // const overlayContainerElement=document.querySelector('.overlay-container');
  // const overlayLayer= new ol.Overlay({
  //     element:overlayContainerElement
  // })
  // map.addOverlay(overlayLayer);
  // const overlayFeatureName=document.getElementById('feature-name');

  // map.on('click',(e)=>{
  //     overlayLayer.setPosition(undefined);
  //     map.forEachFeatureAtPixel(e.pixel,(feature,layer)=>{
  //         let clickedCoordinate=e.coordinate;
  //         let clickedFeatureName=feature.get('name');
  //         overlayLayer.setPosition(clickedCoordinate);
  //         overlayFeatureName.innerHTML=clickedFeatureName;
  //     });
  // });

  // map.addLayer(stamenTerrain); // call a single layer

//   map.on('click',function(e){
//       console.log(e.coordinate);// logs coordinates from the location clicked
// }) 
};
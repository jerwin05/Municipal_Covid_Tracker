window.onload=init;
function init (){
  const residentsForm=document.getElementById('residentsForm');
  const updatedResidentRemarkMessage=document.getElementById('updatedResidentRemarkMessage');

  const residentPositiveCoordinatesAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/positive-coordinates' : 'https://meower-api.now.sh/v2/mews';
  const residentsAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/residentList' : 'https://meower-api.now.sh/v2/mews';
  
  const map= new ol.Map({
      view:new ol.View({
          projection:'EPSG:4326',
          center:[121.21590561149567, 14.554211974185318],
          zoom:15,
          maxZoom:19,
          minZoom:13
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

  //execute if admin wish to update resident remarks
  residentsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const resident=document.querySelectorAll('.residentRemarksInput');//get all checkboxes
    const formData = new FormData(residentsForm);//store form credentials

    for(var x=0,y=resident.length;x<y;x++){//iterate over each checkbox 
      const residentId=parseInt(resident[x].name.match(/\d+/)[0]);//get checkbox id
      const remarks= formData.get(resident[x].name);// get checkbox value
      
      const residentDetails={//store data in a object
        id:residentId,
        remarks:remarks
      }
      
      fetch(residentsAPI_URL, {//send object to the server
          method: 'PUT',
          body: JSON.stringify(residentDetails),//make object in json format
          headers: {
            'content-type': 'application/json'
        }
      });
    }
 
    updatedResidentRemarkMessage.textContent='Remarks Updated';
    updatedResidentRemarkMessage.style.display='';
    setTimeout(()=>{
      getPositiveResidentCoordinates();
    },500);
    setTimeout(()=>{
      updatedResidentRemarkMessage.style.display='none';
    },5000);
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
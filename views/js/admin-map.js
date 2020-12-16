window.onload=init;
function init (){
  const map= new ol.Map({
      view:new ol.View({
          projection:'EPSG:4326',
          center:[121.2071937966153, 14.559724584263174],
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
  const baseLayerElements=document.querySelectorAll('.map--layer>input[type=radio]');
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
    'features': [{
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

  var vectorLayer;

  function callvector(){
    vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction,
    });
    map.addLayer(vectorLayer); 
  }

  // function getPositiveResidentCoordinates(){
  //   geojsonObject.features[0].geometry.geometries=[];
  //   fetch(residentPositiveCoordinatesAPI_URL,{
  //   }).then(response=>{
  //     response.json().then(result=>{
  //       if(result.length){
  //         result.forEach((coordinates)=>{
  //           let newPoint={
  //             'type':'Point',
  //             'coordinates':[coordinates.longitude,coordinates.latitude]
  //           };    
  //           geojsonObject.features[0].geometry.geometries.push(newPoint);
  //         });
  //         vectorSource.clear();
  //         vectorSource = new ol.source.Vector({
  //           features: new ol.format.GeoJSON().readFeatures(geojsonObject)
  //         });
  //         callvector();
  //       }
  //       else{
  //         vectorSource.clear();
  //         callvector();
  //       }
  //     });
  //   });
  // }

  //get residents and populate the residents form
  // function getResidents(){
  //   fetch(residentsAPI_URL,{}).then(response=>{
  //     response.json().then(result=>{
  //       result.forEach(resident => {

  //         const label = document.createElement('label');
  //         const residentDiv = document.createElement('div');
  //         const residentName = document.createElement('p');
  //         const residentDetail = document.createElement('p');
  //         const input = document.createElement('input');
  //         const button = document.createElement('button');
  //         const overlaydiv = document.createElement('div');
  //         const overlaydiv1 = document.createElement('div');
  //         const p = document.createElement('p');
  //         const button1 = document.createElement('button');
  //         const button2 = document.createElement('button');

  //         label.setAttribute("for", `remarks${resident.id}`);
  //         input.setAttribute("name", `remarks${resident.id}`);
  //         input.setAttribute("value", "positive");
  //         input.setAttribute("type", "checkbox");
  //         input.className='residentRemarksInput';
  //         button.className = 'profile--button blue--button';
  //         button.setAttribute("type", "button");
  //         button.textContent='Delete';
  //         residentName.textContent=`${resident.last_name}, ${resident.first_name} ${resident.middle_name}`;
  //         residentName.className='resident--name';
  //         residentDetail.textContent=`${resident.mob_no}`;
  //         residentDetail.className='resident--mobNo';
  //         overlaydiv.className='overlay';
  //         overlaydiv1.className='popUp--container';
  //         p.textContent='Are you sure you want to delete this resident?';
  //         p.setAttribute("class", `message`);
  //         button1.setAttribute("class", `yes deleteResident${resident.id}`);
  //         button2.setAttribute("class", `no`);
  //         button1.setAttribute("type", `button`);
  //         button2.setAttribute("type", `button`);
  //         button1.textContent='Yes';
  //         button2.textContent='No';

  //         if(resident.remarks=='positive'){
  //           input.checked=true;
  //         }else{
  //           input.checked=false;
  //         }

  //         const residentid={
  //           id:resident.id
  //         }

  //         button.addEventListener('click',()=>{
  //           overlaydiv.style.display='flex';
  //         });
  //         button2.addEventListener('click',()=>{
  //           overlaydiv.style.display='none';
  //         });

  //         button1.addEventListener('click',(event)=>{
  //           event.preventDefault();
  //           getPositiveResidentCoordinates();
  //           overlaydiv.style.display='none';
  //           fetch(residentsAPI_URL, {//send object to the server
  //             method: 'DELETE',
  //             body: JSON.stringify(residentid),//make object in json format
  //             headers: {
  //               'content-type': 'application/json'
  //             }
  //           });
            
  //           setTimeout(()=>{  
  //             residentsFormSection.innerHTML = "";
  //             getResidents();
  //           },100);
  //         });

  //         overlaydiv1.appendChild(p);
  //         overlaydiv1.appendChild(button1);
  //         overlaydiv1.appendChild(button2);
  //         overlaydiv.appendChild(overlaydiv1);
  //         body.appendChild(overlaydiv);          

  //         residentDiv.appendChild(residentName);
  //         residentDiv.appendChild(residentDetail);
  //         label.appendChild(residentDiv);
  //         label.appendChild(input);
  //         label.appendChild(button);
        
  //         residentsFormSection.appendChild(label);
  //       });
  //     });
  //   });
  // }

  // getPositiveResidentCoordinates();
  // getResidents();

  //execute if admin wish to update resident remarks
  // residentsForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const resident=document.querySelectorAll('.residentRemarksInput');//get all checkboxes
  //   const formData = new FormData(residentsForm);//store form credentials

  //   for(var x=0,y=resident.length;x<y;x++){//iterate over each checkbox 
  //     const residentId=parseInt(resident[x].name.match(/\d+/)[0]);//get checkbox id
  //     const remarks= formData.get(resident[x].name);// get checkbox value
      
  //     const residentDetails={//store data in a object
  //       id:residentId,
  //       remarks:remarks
  //     }
      
  //     fetch(residentsAPI_URL, {//send object to the server
  //         method: 'PUT',
  //         body: JSON.stringify(residentDetails),//make object in json format
  //         headers: {
  //           'content-type': 'application/json'
  //       }
  //     });
  //   }
 
  //   successMessage.textContent='Remarks Updated';
  //   successMessage.style.bottom='30';
  //   setTimeout(()=>{
  //     getPositiveResidentCoordinates();
  //   },500);
  //   setTimeout(()=>{
  //     successMessage.style.bottom='-45';
  //   },3000);
  // });


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

  // map.on('click',function(e){
  //     console.log(e.coordinate);// logs coordinates from the location clicked
  // }) 
};
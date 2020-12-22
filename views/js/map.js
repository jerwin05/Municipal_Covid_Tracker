window.onload=init;
function init(){
    const map= new ol.Map({
        view:new ol.View({
            projection:'EPSG:4326',
            center:[121.2071937966153, 14.559724584263174],
            zoom:16,
            // zoom:16.415,
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
      baseLayerElemet.addEventListener('change',()=>{
          let baseLayerElementValue =this.value;
          baseLayerGroup.getLayers().forEach((element,index,array)=>{
              let baseLayerTitle=element.get('title');
              element.setVisible(baseLayerTitle === baseLayerElementValue);
          });
      });
  };

  //----------------------------------------------------------------------------------------------------------------------------

  // var styles = {
  //   'GeometryCollection': new ol.style.Style({
  //     image: new ol.style.Circle({
  //       radius: 7,
  //       fill: new ol.style.Fill({
  //         color:'orange'
  //       }),
  //       stroke: new ol.style.Stroke({
  //         color: 'black',
  //       })
  //     })
  //   })
  // };

  // var styleFunction = (feature)=> {
  //   return styles[feature.getGeometry().getType()];
  // };

  // function getPositiveResidentCoordinates(){
  //   geojsonObject.features[0].geometry.geometries=[];
  //   fetch(residentPositiveCoordinatesAPI_URL,{
  //   }).then(response=>{
  //     response.json().then(result=>{
  //       if(result.length){
  //         let newPoint;
  //         result.forEach((coordinates)=>{
  //           newPoint={
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
  // getPositiveResidentCoordinates();

  // button.addEventListener('click',()=>{
  //   getPositiveResidentCoordinates();
  //   button.textContent='Refreshed';
  //   setTimeout(()=>{
  //     button.textContent='Refresh';
  //   },1000)
  // });

  //--------------------------------------------------------------------------------------------------------------------------------------

    // vector layers
    const strokeStyle=new ol.style.Stroke({
        color:'#F4A647',
        // color:[245, 180, 97, 0.71],
        // color:'black',
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

    var style 
    = new ol.style.Style({
        text: new ol.style.Text({
            font: 'bold 14.5px "Open Sans", "Arial Unicode MS", "sans-serif"',
            fill: new ol.style.Fill({color: '#7F7F7F'}),
            stroke: new ol.style.Stroke({color: '#fff', width: 2}),
        }),
    })
    ;

    var styleFunction = (feature)=> {
        style.getText().setText(feature.get('name'));
        return style;
    }

    var currZoom = map.getView().getZoom(); 
    var weightedZoom=0;
    var fontSize=14.5;
    map.on('moveend', (e)=>{
        var newZoom = map.getView().getZoom();

        // console.log(newZoom);

        if(currZoom>16.415){
            style = new ol.style.Style({
                text: new ol.style.Text({
                    font: 'bold 0px "Open Sans"'
                })
            });
        }

        if (currZoom > newZoom) {
            if(newZoom<=16.415){
                // weightedZoom+=1;
                fontSize=fontSize-(currZoom-newZoom);
            }
            currZoom = newZoom;
        }else if(currZoom<newZoom){
            if(newZoom<=16.415){
                // weightedZoom-=1;
                fontSize=fontSize+(newZoom-currZoom);
            }
            currZoom = newZoom;
        }

        // console.log('before: ',fontSize);

        if(currZoom<=16.415&&currZoom>12.2){
            style = new ol.style.Style({
                text: new ol.style.Text({
                    font: `bold ${fontSize}px "Open Sans", "Arial Unicode MS", "sans-serif"`,
                    fill: new ol.style.Fill({color: '#8E8E8E'}),
                    stroke: new ol.style.Stroke({color: '#fff', width: 2})
                })
            });
        }else if(currZoom<=12.2){
            style = new ol.style.Style({
                text: new ol.style.Text({
                    font: 'bold 0px "Open Sans"'
                })
            });
        }

        console.log('after: ',fontSize);
    });

    var geojsonObject = 
        {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326',
                }
            },
            'features': [
            {
                "type": "Feature",
                "properties": {
                "name": "Poblacion",
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
                "name": "Prinza",
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
                "name": "San Roque",
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
                "name": "Dalig",
                },
                "geometry": {
                "type": "Point",
                "coordinates": [
                    121.23115009659746,
                    14.571688019526668
                ]
                }
            }
        ]
    };

    var vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojsonObject)
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
    });
    map.addLayer(vectorLayer); 

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
//   }) 
};
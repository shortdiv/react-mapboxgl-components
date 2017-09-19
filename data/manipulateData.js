var fs = require('fs')
const MapboxClient = require('mapbox/lib/services/directions');

var mbClient = new MapboxClient('pk.eyJ1Ijoic2hvcnRkaXYiLCJhIjoiY2l3OGc5YmE5MDJzZjJ5bWhkdDZieGdzcSJ9.1z-swTWtcCHYI_RawDJCEw');

var convertRoutes = function(data) {
  console.log('converting')
  let promises = []
    data.features.map((feature)=> {
      promises.push(
        mbClient.getDirections([
          {latitude: feature.geometry.coordinates[0][1], longitude: feature.geometry.coordinates[0][0]},
          {latitude: feature.geometry.coordinates[1][1], longitude: feature.geometry.coordinates[1][0]}
        ], {
          profile: 'cycling',
          alternatives: false,
          geometry: 'polyline'
        }, (err, results) => {
          return results;
        }).then((results) => {
          return results.entity
        })
      )
    })
    return Promise.all(promises)
}

var getData = function() {
  const rawData = readFile()
  const convertedData = rawData.then((data) =>{ return convertRoutes(data) })
  return Promise.all([rawData, convertedData])
    .then(([tripData, routeData])=>{
      let features = []
      routeData.map((route, index) => {
        if(route.routes) {
          const geom = route.routes[0].geometry
          const properties = tripData.features[index].properties
          features.push({
            "type": "Feature",
            "geometry": geom,
            "properties": properties
          })
        }
      })
      return features
    })
}

var readFile = function() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/hubway.geojson', 'utf8', (err, data) => {
      resolve(JSON.parse(data))
    })
  })
}

var writeToFile = function() {
  getData().then((features) => {
    console.log('formatting and writing')
    let feat = {
      "type": "FeatureCollection",
      "features": features
    }
    feat = JSON.stringify(feat)
    console.log(feat)
    fs.writeFile('./data/convertedRoutes.geojson', feat, 'utf8', (err, data) => {
      if(err) return console.log(err)
      console.log('file written')
    })
  })
}

writeToFile()

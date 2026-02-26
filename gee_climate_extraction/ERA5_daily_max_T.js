// MAXIMUM DAILY TEMPERATURE //
// === 1. Load polygon (USER MUST SUPPLY) ===
// NOTE: For reproducibility, provide the same habitat polygon used in the study.
// If a public polygon is available, upload it to your GEE Assets and load it here.
// Example (replace with your own asset):
// var GZ_simple = ee.FeatureCollection('your_path/GZ_simple');

var GZ_simple = ee.FeatureCollection('your_path/GZ_simple'); // <-- replace

//or

//
// === Load habitat polygon ===
// 1) Download the GeoJSON from the repository: spatial_data_for_gee/GZ_simple.geojson
// 2) Upload it to your Google Earth Engine Assets
// 3) Replace 'your_path/GZ_simple'
//

var GZ_simple = ee.FeatureCollection('your_path/GZ_simple'); // <- replace

Map.centerObject(GZ_simple, 8);
Map.addLayer(GZ_simple, {color: 'blue'}, 'GZ_simple');

// === 2. Set date range ===
var start = ee.Date('2005-01-01');
var end = ee.Date('2018-12-31');

// === 3. Load ERA5 daily max temp ===
var era5Max = ee.ImageCollection('ECMWF/ERA5/DAILY')
  .filterDate(start, end)
  .select('maximum_2m_air_temperature')
  .map(function(img) {
    // Convert from Kelvin to Celsius
    var celsius = img.subtract(273.15).rename('max_temp_C');
    return celsius.set('system:time_start', img.get('system:time_start'));
  });

// === 4. Generate daily dates ===
var nDays = end.difference(start, 'day').toInt();
var dates = ee.List.sequence(0, nDays.subtract(1)).map(function(offset) {
  return start.advance(offset, 'day');
});

// === 5. Extract daily max temp over polygon ===
var dailyMaxTemp = ee.FeatureCollection(dates.map(function(date) {
  date = ee.Date(date);
  var image = era5Max.filterDate(date, date.advance(1, 'day')).first();
  
  return ee.Algorithms.If(image,
    ee.Feature(null, {
      'date': date.format('YYYY-MM-dd'),
      'max_temp_C': image.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: GZ_simple.geometry(),
        scale: 27830, 
        maxPixels: 1e13
      }).get('max_temp_C')
    }),
    null
  );
})).filter(ee.Filter.notNull(['max_temp_C']));

// === 6. Export to Google Drive ===
Export.table.toDrive({
  collection: dailyMaxTemp,
  description: 'DailyMaxTemp_GZ_simple_05_18',
  fileFormat: 'CSV'
});

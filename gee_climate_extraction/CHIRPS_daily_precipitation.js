//
// === 1. Load polygon (USER MUST SUPPLY) ===
// Provide the same habitat polygon used in the study by uploading it to your GEE Assets.
// Example:
// var GZ_simple = ee.FeatureCollection('users/your_username/GZ_simple');
//

var GZ_simple = ee.FeatureCollection('users/REPLACE_WITH_YOUR_ASSET/GZ_simple'); // <-- replace

//or

//
// === Load habitat polygon ===
// 1) Download the GeoJSON from the repository: spatial_data_for_gee/GZ_simple.geojson
// 2) Upload it to your Google Earth Engine Assets
// 3) Replace 'users/YOUR_USERNAME/GZ_simple'
//

var GZ_simple = ee.FeatureCollection('users/YOUR_USERNAME/Giraffe_Zone_Polygon_OConnor2019_digitised');

// Optionally check it
print('GZ_simple', GZ_simple);
Map.centerObject(GZ_simple, 8);
Map.addLayer(GZ_simple, {color: 'blue'}, 'GZ_simple');


// 1. Define time range
var start = ee.Date('2005-01-01');
var end = ee.Date('2018-12-31');

// 2. Load CHIRPS daily precipitation
var precip = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                .filterDate(start, end)
                .select('precipitation');

// 3. Get list of all days
var nDays = end.difference(start, 'day').toInt();
var dates = ee.List.sequence(0, nDays.subtract(1)).map(function(day) {
  return start.advance(day, 'day');
});

// 4. Map over each date to extract precipitation
var dailyPrecip = ee.FeatureCollection(dates.map(function(date) {
  date = ee.Date(date);
  var img = precip.filterDate(date, date.advance(1, 'day')).first();
  
  var meanPrecip = img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: GZ_simple,
    scale: 5000,            // CHIRPS ~5 km resolution
    maxPixels: 1e13,
  }).get('precipitation');
  
  return ee.Feature(null, {
    date: date.format('YYYY-MM-dd'),
    precip_mm: meanPrecip
  });
}));

// 5. Inspect sample data
print('Daily precipitation (sample):', dailyPrecip.limit(10));

// 6. Export to Google Drive or asset
Export.table.toDrive({
  collection: dailyPrecip,
  description: 'DailyPrecip_GZ_simple_2005_18',
  fileFormat: 'CSV'
});

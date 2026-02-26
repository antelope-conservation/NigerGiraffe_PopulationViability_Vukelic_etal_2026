# VukelicEtAl2026_NigerGiraffeCMR_TempAndPrecip
This repository contains supporting data and R scripts for the capture-mark-recapture (CMR) analyses used to assess the effects of temperature and precipitation on apparent survival of the West African giraffe in the Giraffe Zone (2005–2018), implemented using multistate mark-recapture (MSMR) models. It also includes the Google Earth Engine (GEE) scripts used to extract the climate covariates and the digitised habitat polygon (GeoJSON; derived from O’Connor et al., 2019) required to reproduce the climate data extraction workflow.

## Repository Structure

---

### 📂 R
Contains R scripts.

- **MSMR_temperature_GZ**  
  Used to perform multistate mark–recapture (MSMR) analysis with temperature as a covariate  
  (temperature is expressed as the number of days with maximum daily temperature equal or above 35 °C, excluding December–February period).

- **GOF_MSMR_temperature**  
  Used to create and export saturated global MSMR model with temperature as a covariate for goodness-of-fit analysis.

- **MSMR_precipitation_GZ**  
  Used to perform multistate mark–recapture (MSMR) analysis with precipitation as a covariate  
  (precipitation is expressed as total precipitation in months of June, July and August, JJA precipitation, in mm).

- **GOF_MSMR_precipitation**  
  Used to create and export saturated global MSMR model with precipitation as a covariate for goodness-of-fit analysis.

---

### 📂 data_for_R
Contains `.csv` files used in R analysis.

- **WA_giraffe_encounter_histories**  
  Encounter histories used in the MSMR analyses are not included in this repository due to data governance arrangements and the conservation status of the West African giraffe.  
  The dataset is collectively owned by the responsible Nigerien authorities and collaborating NGOs.  
  Access may be granted upon reasonable request and subject to an appropriate Data Sharing Agreement with the responsible institutions.  
  To request the data, contact the corresponding author.

- **DailyMaxTemp_GZ_simple_05_18**  
  Used in scripts `MSMR_temperature_GZ` and `GOF_MSMR_temperature`.  
  Contains 2 columns with date and temperature; maximum daily temperature in °C from 1 January 2005 until 31 December 2018.

- **DailyPrecip_GZ_simple_05_18**  
  Used in scripts `MSMR_precipitation_GZ` and `GOF_MSMR_precipitation`.  
  Contains 2 columns with date and precipitation; daily precipitation in mm from 1 January 2005 until 31 December 2018.

---

### 📂 gee_climate_extraction
Contains `.js` files for temperature and precipitation data extraction.

- **ERA5_daily_max_T.js**  
  Extracts daily maximum 2 m air temperature (°C) from the ERA5 reanalysis dataset (ECMWF/ERA5/DAILY) for the defined giraffe habitat polygon from 1 January 2005 to 31 December 2018.  
  It requires uploading polygon `GZ_simple` as an asset in Google Earth Engine.  
  The `GZ_simple` polygon can be found in the folder `spatial_data_for_gee` as a `.geojson` file.

- **CHIRPS_daily_precipitation.js**  
  Extracts daily precipitation (mm) from the CHIRPS dataset (UCSB-CHG/CHIRPS/DAILY) for the same polygon and time period.

---

### 📂 spatial_data_for_gee
Contains `.geojson` file.

- **GZ_simple**  
  Used in Google Earth Engine to extract the climate data for the Giraffe Zone.  
  Data can be extracted using the code found in folder `gee_climate_extraction`.

# NigerGiraffe_PopulationViability_Vukelic_etal_2026
This repository contains supporting data and analysis scripts for the manuscript:

“Socio-economic instability and food insecurity drive extinction risk under climate change: insights from the Vulnerable West African giraffe.”

The repository provides R scripts used to perform capture-mark-recapture (CMR) analyses assessing the effects of temperature and precipitation on apparent survival of the West African giraffe in the Giraffe Zone, Niger (2005–2018). Analyses were implemented within a multistate mark-recapture (MSMR) modelling framework.

It further includes the Google Earth Engine (GEE) scripts used to derive climate covariates, as well as the digitised habitat polygon required to reproduce the climate data extraction workflow.

## Repository Structure

---

### 📂 R
Contains R scripts.

- **MSMR_temperature_GZ**  
  Used to perform multistate mark-recapture (MSMR) analysis with temperature as a covariate  
  (temperature is expressed as the number of days with maximum daily temperature equal or above 35 °C, excluding December–February period).

- **GOF_MSMR_temperature**  
  Used to create and export saturated global MSMR model with temperature as a covariate for goodness-of-fit analysis.

- **MSMR_precipitation_GZ**  
  Used to perform multistate mark-recapture (MSMR) analysis with precipitation as a covariate  
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
Contains `.js` files for temperature and precipitation data extraction from Google Earth Engine Code Editor

- **ERA5_daily_max_T.js**  
  Extracts daily maximum 2 m air temperature (°C) from the ERA5 reanalysis dataset (ECMWF/ERA5/DAILY) for the defined giraffe habitat polygon  from 1 January 2005 to 31 December 2018.  
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

---

  ## Data Sources

Climate data were accessed via the Google Earth Engine (GEE) Data Catalog (Gorelick et al., 2017).

- ERA5 daily reanalysis data (ECMWF/ERA5/DAILY; Copernicus Climate Change Service (C3S), 2017)
- CHIRPS daily precipitation data (UCSB-CHG/CHIRPS/DAILY; Funk et al., 2015)

The Giraffe Zone habitat polygon was digitised from:
- O’Connor et al. (2019)

---

Copernicus Climate Change Service (C3S), 2017. ERA5: Fifth generation of ECMWF atmospheric reanalyses of the global climate. Copernicus Climate Change Service Climate Data Store (CDS). Available from: https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels (accessed 10th July 2025).

Funk, C., Peterson, P., Landsfeld, M., Pedreros, D., Verdin, J., Shukla, S., Husak, G., Rowland, J., Harrison, L., Hoell, A., Michaelsen, J., 2015. The climate hazards infrared precipitation with stations—A new environmental record for monitoring extremes. Sci. Data 2, 150066. https://doi.org/10.1038/sdata.2015.66.

Gorelick, N., Hancher, M., Dixon, M., Ilyushchenko, S., Thau, D., Moore, R., 2017. Google Earth Engine: Planetary-scale geospatial analysis for everyone. Remote Sens. Environ. 202, 18–27. https://doi.org/10.1016/j.rse.2017.06.031.

O’Connor, D., Stacy-Dawes, J., Muneza, A., Fennessy, J., Gobush, K., Chase, M.J., Brown, M.B., Bracis, C., Elkan, P., Zabeirou, A.R.M., Rabeil, T., Rubenstein, D., Becker, M.S., Phillips, S., Stabach, J.A., Leimgruber, P., Glikman, J.A., Ruppert, K., Masiaine, S., Mueller, T., 2019. Updated geographic range maps for giraffe, Giraffa spp., throughout sub-Saharan Africa, and implications of changing distributions for conservation. Mamm. Rev. 49, 285–299. https://doi.org/10.1111/mam.12165.

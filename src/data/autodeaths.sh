csvsql --query "
select cast(year as integer) as year,
       cast(deaths as integer) as deaths,
       cast(vehicle_miles_traveled_billions as integer) as vehicle_miles_traveled_billions,
       cast(population as integer) as population,
       alcohol_related,
       alcohol_related_derived,
  case
    when alcohol_related is not null then cast(deaths - alcohol_related as integer)
    else null
  end as non_alcohol_related
from autodeaths
" autodeaths.csv > transformed_autodeaths.csv
csv2json transformed_autodeaths.csv autodeaths.json

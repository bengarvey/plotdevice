csvsql --query "
select \"PIZZA JOINT\" as name, trim(Rater) as user, \"City of pizza\" as location, \"Date completed\" as \"created_at\", Price as price, \"First bite satisfaction\" as first_bite, \"Oil puddle goodness\" as opg,\"Crust\" as crust, \"Number of slices eaten\" as slices, \"Cheeeeeeeeeese\" as cheese, Notes as notes from pizza
" pizza.csv > tidy_pizza.csv
csvsql --query "
select t.name, t.location, 
(select avg(c.first_bite + c.opg + c.crust + c.cheese + c.slices) from tidy_pizza c where c.user = 'Carolyn' and c.name = t.name and c.location = t.location) as carolyn_score,
(select avg(b.first_bite + b.opg + b.crust + b.cheese + b.slices) from tidy_pizza b where b.user = 'Benjamin' and b.name = t.name and b.location = t.location) as benjamin_score,
avg(t.first_bite + t.opg + t.crust + t.cheese + t.slices) as score from tidy_pizza t group by t.name, t.location order by score desc
" tidy_pizza.csv > calculated_pizza_total.csv
csvjson tidy_pizza.csv > tidy_pizza.json
csvjson calculated_pizza_total.csv > calculated_pizza_total.json

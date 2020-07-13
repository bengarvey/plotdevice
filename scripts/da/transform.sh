csvsql --query "
  select \"Payment Date (MST)\" as created_at, \"Transaction ID\" as id, \"Payer IP\" as ip, Quantity as quantity, Amount as amount 
    from dungeon
" dungeon.csv > clean.csv

csvsql --query "
  with paid as (
    select date(created_at, 'start of month') as day, sum(quantity) as quantity, sum(amount) as amount
      from clean
      where amount > 0
      group by 1
  ),
  free as (
    select date(created_at, 'start of month') as day, sum(quantity) as quantity, sum(amount) as amount
      from clean
      where amount = 0
      group by 1
  ),
  combined as (
    select coalesce(p.day, f.day) as day, p.quantity as paid_quantity, p.amount as paid_amount, f.quantity as free_quantity, f.amount as free_amount
    from paid p
    left outer join free f on p.day = f.day
  )
  select * from combined
" clean.csv > agg.csv

csvsql --query "
  with recursive all_dates(date) as (
    values('2011-03-01')
    union all
    select date(date, '+1 month')
    from all_dates
    where date < current_timestamp
  )
  select d.date, coalesce(a.paid_quantity, 0) as paid_quantity, coalesce(a.paid_amount, 0) as paid_amount,
    coalesce(a.free_quantity, 0) as free_quantity, coalesce(a.free_amount, 0) as free_amount
    from all_dates d
    left outer join agg a on a.day = d.date
    group by 1
" agg.csv > da.csv
csvjson da.csv > ../../src/data/da.json


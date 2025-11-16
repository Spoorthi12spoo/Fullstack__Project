create table if not exists expenses(
    id integer primary key,
    title varchar(100) not null,
    amount real not null,
    date text not null,
    category varchar(100) ,
    notes text
);





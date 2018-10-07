//To tell the mongo to work on the mentioned db
db.getSiblingDB('omdevdb');

//Clear the collection first
db.teams.remove({});

//Insert fields
db.teams.insert({
	name: 'GAPPS'
});

db.teams.insert({
	name: 'G3Loaders'
});

db.teams.insert({
	name: 'Derivatives'
});

db.teams.insert({
	name: 'TRAM'
});

db.teams.insert({
	name: 'All'
});

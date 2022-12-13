// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	const test = filmingLocations.sort(function(a,b){return new Date(a.fields.date_debut)-new Date(b.fields.date_debut);})
	return test
}

//console.log(sortFilmingLocationsByStartDate())
//const sorted = sortFilmingLocationsByStartDate()
//console.log(`${sorted[0].fields.date_debut},${sorted[sorted.length-1].fields.date_debut}`)

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	const test = filmingLocations.filter(value => value.fields.annee_tournage == 2020)
	return test.length
}

console.log(getFilmingLocationsNumber2020())

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	var dico = {} // creation dico
	filmingLocations.forEach(function(element) {
		if (element.fields.annee_tournage in dico)
		{
			dico[element.fields.annee_tournage]++
		}
		else
		{
			dico[element.fields.annee_tournage] = 1
		}
	})
	return dico

}
console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	var dico = {}
	filmingLocations.forEach(function(element) {
		if (element.fields.ardt_lieu in dico)
		{
			dico[element.fields.ardt_lieu]++
		}
		else
		{
			dico[element.fields.ardt_lieu] = 1
		}
	})
	return dico
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	var dico = {}
	filmingLocations.forEach(function (element)
	{
		if (element.fields.nom_tournage in dico)
		{
			dico[element.fields.nom_tournage]++
		}
		else
		{
			dico[element.fields.nom_tournage] = 1
		}
	})

	//const cles = Object.keys(dico).map(filmname => {return {film : filmname}})
	//const val = Object.values(dico).map(locations => {return{location : locations}})


	var keys = Object.keys(dico)
	keys.sort()

	var i,len = keys.length
	var sortedDict= []
	for (i=0;i<len;i++)
	{
		let v = keys[i]

		sortedDict.push({'film':v, 'locations' : dico[v]}); // revoir car dico[v] ne fonctionne pas
	}

	return sortedDict
	//return dico
}

console.log(getFilmLocationsByFilm())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {

	return getFilmLocationsByFilm().length
}
console.log(getNumberOfFilms())

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	var resul = []
	filmingLocations.forEach(function (element)
	{
		if (element.fields.nom_tournage == 'LRDM - Patriot season 2')
		{
			resul.push(element.fields.ardt_lieu)
		}
	})
	return resul
}

console.log(getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissements des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	var fav = {}
	favoriteFilmsNames.forEach(function(element1)
	{
		var favtab = []
		filmingLocations.forEach(function(element)
		{
			if (element.fields.nom_tournage == element1)
			{
				favtab.push(element.fields.ardt_lieu)
			}

		})
		fav[element1]=favtab
	})
	return fav
}

const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]


console.log(getFavoriteFilmsLocations(favoriteFilms))


// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	var Films = [] // tableau de tous les films
	filmingLocations.forEach(function(element)
	{
		if (!Films.includes(element.fields.nom_tournage))
		{
			Films.push(element.fields.nom_tournage)
		}
	})
	const loc = getFavoriteFilmsLocations(Films)
	return loc
}
console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	var tab = []
	filmingLocations.forEach(function(element)
	{
		if(!tab.includes(element.fields.type_tournage))
		{
			tab.push(element.fields.type_tournage)
		}
	})
	return tab.length
}
console.log(countFilmingTypes())

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const setType = new Set()
	filmingLocations.forEach(film => setType.add(film.fields.type_tournage))
	let tab1 = []
	setType.forEach(function (type) {
		let dictionnary = {}
		dictionnary[type] = filmingLocations.filter(function (o) {return o.fields.type_tournage == type}).length
		tab1.push(dictionnary)
	})
	return tab1.sort((a,b) => Object.values(b) -  Object.values(a))
}
console.log(sortedCountFilmingTypes())

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function LongestDurationFilm() {
	let longestMovie = filmingLocations[0]
	for(let i = 0; i < getFilmingLocationsNumber() - 1; i++) {
		longestMovie= Date.parse(longestMovie.fields.date_fin) - Date.parse(longestMovie.fields.date_debut) < Date.parse(filmingLocations[i+1].fields.date_fin) - Date.parse(filmingLocations[i+1].fields.date_debut) ? filmingLocations[i+1] : longestMovie
	}
	return longestMovie.fields.nom_tournage + ' durée: ' + duration(Date.parse(longestMovie.fields.date_fin) - Date.parse(longestMovie.fields.date_debut))
}
// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
function AverageFilmingDuration() {
	return duration(filmingLocations.map(film => Date.parse(film.fields.date_fin) - Date.parse(film.fields.date_debut)).reduce((duree1, duree2) => duree1 + duree2)/getFilmingLocationsNumber())
}

console.log('durée moyenne des filming location : ' + AverageFilmingDuration())

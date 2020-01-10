'use strict';

const formElement = document.querySelector('#form');
const inputElement = document.querySelector('#searchInput');
const searchListElement = document.querySelector('#searchList');
const favoriteListElement = document.querySelector('#favoriteList');
const listDivElement = document.querySelector('#listsDiv')
const header = document.querySelector('.header')

async function handlerSearch(event) {
  searchListElement.innerHTML = ''; 
  const search = inputElement.value;
  event.preventDefault();

  header.style.height = "140px";

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
  const series = await response.json();

  const listItemsContainer = document.createElement('div');
  listItemsContainer.classList.add('main__lists__searchList-container');
  const searchListTitle = document.createElement('h2');
  searchListTitle.classList.add('main__lists__searchList-searchListTitle');
  searchListTitle.innerHTML = `${series.length} titles`;
  searchListElement.appendChild(searchListTitle);

  for (let serieItem of series) {
    if(serieItem.show.image !== null) {
    const serieObject = {};
    const serieId = `${serieItem.show.id}`; // convertimos el id a string

    const liElement = document.createElement('li');
    liElement.classList.add('main__lists__searchList-container-liContainer');

    //Comprobamos los items guardados en favoritos en localstore y les añadimos la clase favorite
    if (isFavSerie(serieId)) {
      liElement.classList.add('favorite');
      console.log(serieId);
    }
 
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('main__lists__searchList-container-liContainer-imageContainer')

    const summary = document.createElement('p');
    summary.classList.add('main__lists__searchList-container-liContainer-description-summary-info');
    if (serieItem.show.summary.length > 400) {
      summary.innerHTML = `${serieItem.show.summary.substr(0,400)}...`;
    } else {
      summary.innerHTML = `${serieItem.show.summary}`;
    }

    const genreContainer = document.createElement('div');
    genreContainer.classList.add('main__lists__searchList-container-liContainer-description-genre');
    const genres = serieItem.show.genres;
    let genre = ''
    for (let i = 0; i < genres.length; i++) {
      genreContainer.innerHTML += genres[i] + ' ';
        }
      //genre = `${genre} + '' + ${genre[i]}`;
    //}
    //genreContainer.innerHTML= `${genre}`

    const language = document.createElement('div');
    language.classList.add('main__lists__searchList-container-liContainer-description-header-language');
    language.innerHTML = `Language: ${serieItem.show.language}`

    const average = document.createElement('div');
    average.classList.add('main__lists__searchList-container-liContainer-description-header-average');
    if(serieItem.show.rating.average !== null) {
      if(serieItem.show.rating.average <= 1){
        average.innerHTML = `${serieItem.show.rating.average} <i class="fas star fa-star-half-alt"></i></i><i class="star far fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
      } else if (serieItem.show.rating.average >= 2 &&   serieItem.show.rating.average < 3) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
      } else if (serieItem.show.rating.average >= 3 &&   serieItem.show.rating.average < 4) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="fas star fa-star-half-alt"></i><i class="star far fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
    
      } else if (serieItem.show.rating.average >= 4 &&   serieItem.show.rating.average < 5) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star far fa-star"><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
     
      } else if (serieItem.show.rating.average >= 5 &&   serieItem.show.rating.average < 6) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="fas star fa-star-half-alt"></i><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
     
      } else if (serieItem.show.rating.average >= 6 &&   serieItem.show.rating.average < 7) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star far fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
     
      } else if (serieItem.show.rating.average >= 7 &&   serieItem.show.rating.average < 8) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="fas star fa-star-half-alt"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
     
      } else if (serieItem.show.rating.average >= 8 &&   serieItem.show.rating.average < 9) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star far fa-star"></i>`
        liElement.style.order = '0';
     
      } else if (serieItem.show.rating.average >= 9 &&   serieItem.show.rating.average < 10) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="fas star fa-star-half-alt"></i>`
        liElement.style.order = '0';
      } else if (serieItem.show.rating.average === 10) {
        average.innerHTML = `${serieItem.show.rating.average} <i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i><i class="star fas fa-star"></i>`
        liElement.style.order = '0';
      } 
    } else {
      average.innerHTML = `Not average yet`
      liElement.style.order = '1';
    }

    //average.innerHTML=`${serieItem.show.rating.average}`;
    console.log(serieItem.show.rating)

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('main__lists__searchList-container-liContainer-description-header');
    const addToFavorite = document.createElement('div');
    addToFavorite.classList.add('main__lists__searchList-container-liContainer-description-header-span-addFavorite');
    addToFavorite.innerHTML = `Add <i class="fas fa-heart"></i> favorite `;

    const span = document.createElement('span');
    span.classList.add('main__lists__searchList-container-liContainer-description-header-span');
    span.innerHTML = `<div class="main__lists__searchList-container-liContainer-description-header-span-title">${serieItem.show.name}<div>`;
    span.appendChild(addToFavorite);

    serieObject.name = serieItem.show.name;
    const imageElement = document.createElement('img');
    if (serieItem.show.image === null) {
      imageElement.src = "https://via.placeholder.com/210x295/868282/fff/?text=IMAGEN%20NOT%20FOUND"
      serieObject.image = imageElement.src;
    } else {
      imageElement.src = serieItem.show.image.medium;
      serieObject.image = serieItem.show.image.medium;
    }
    liElement.id = serieId;
    //liElement.appendChild(premiere);
    const laguageAndSummary = document.createElement('div');
    laguageAndSummary.classList.add('main__lists__searchList-container-liContainer-description-summary')
    const description = document.createElement('div');
    description.classList.add('main__lists__searchList-container-liContainer-description')
    headerContainer.appendChild(span);
    headerContainer.appendChild(average);
    description.appendChild(headerContainer);
    description.appendChild(laguageAndSummary);
    headerContainer.appendChild(language);
    laguageAndSummary.appendChild(summary);
    laguageAndSummary.appendChild(genreContainer);
   
    
    
    imageContainer.appendChild(imageElement);
    liElement.appendChild(imageContainer);
    liElement.appendChild(description);
    listItemsContainer.appendChild(liElement);
    searchListElement.appendChild(listItemsContainer);
    console.log(serieObject);
  }
  }
  

const liElements = document.querySelectorAll('.main__lists__searchList-container-liContainer');
for (const itemLi of liElements) {
itemLi.addEventListener('click', favoriteShow);

formElement.addEventListener('click', ShowNumberResults);
}
  return false;
}

function ShowNumberResults(series) {
  if (series.length < 5) {
    console.log('El número de resultados es menor que 5.');
  } else if (series.length > 5 && series.length < 8){
    console.log('El número de resultados es mayor que 5 y menor que 8.');
  } else if (series.length > 8 && series.length < 10){
    console.log('El número de resultados es mayor que 8 y menor que 10.');
  } else {
    console.log('El número de resultados es mayor que 10.');
  }
}

let favSeriesArray = [];

function addFavSerie(serie) {
  favSeriesArray.push(serie);
  const favseries = JSON.stringify(favSeriesArray);
  localStorage.setItem('favorites', favseries);
  //console.log(favSeriesArray);
}

function removeFavSerie(serieId) {
//Comprobamos los items guardados en favoritos en localstore y les añadimos la clase favorite
  for(let i = 0; i < favSeriesArray.length; i++) {
    const serie = favSeriesArray[i];

    if (serie.id === serieId) {
      favSeriesArray.splice(i, 1);
      const favseries = JSON.stringify(favSeriesArray);
      localStorage.setItem('favorites', favseries);

      console.log(favSeriesArray);
      return;
    }
  }
}

function isFavSerie(serieId) {
  for(let i = 0; i < favSeriesArray.length; i++) {
    const serie = favSeriesArray[i];

    if (serie.id === serieId) {
      return true;
    }
  }
  return false;
}

function favoriteShow(event) {
  event.preventDefault;
  //cambio de color de los favoritos
  const serieElement = event.currentTarget;
  const serieId = serieElement.id;
  serieElement.classList.toggle('favorite');

  //añadir series a favoritos
  if(serieElement.classList.contains('favorite')) {
    const serieObject = {};
    const imageElement = serieElement.querySelector('img');
    const titleElement = serieElement.querySelector('.main__lists__searchList-container-liContainer-span');

    //serieObject.title = titleElement.innerHTML;
    serieObject.image = imageElement.src;
    serieObject.id = serieId;

    addFavSerie(serieObject);
  } else {
    removeFavSerie(serieId);
  }
  getFavorites()
}

function printFavoriteList(favSeriesArray){
  //creamos la lista para guardar los items y un título para esta
  const favoriteSearched = document.createElement('ul');
  favoriteSearched.classList.add('main__lists__favoriteList');
  const favoriteListTitle = document.createElement('h2');
  favoriteListTitle.classList.add('main__lists__favoriteList-listTitle');
  favoriteListTitle.innerHTML = 'Favorites';
  favoriteSearched.appendChild(favoriteListTitle);


  //Por cada item del array de localStore, creamos un li
  for(const serie of favSeriesArray){

  //Creamos el li y le añadimos clase e id para seleccionarlo más tarde
  const favoriteSearchedItem = document.createElement('li');
  favoriteSearchedItem.id = serie.id;
  favoriteSearchedItem.classList.add('main__lists__favoriteList-favoriteItem');

  //Creamos un elemento contenedor del nombre y el close del favorito
  const headerLiContainer = document.createElement('div');
  headerLiContainer.classList.add('.main__lists__favoriteList-favoriteItem-header')
  const closeFavoriteElement = document.createElement('div');

  //Creamos un div para el icono de cerrar
  closeFavoriteElement.classList.add('main__lists__favoriteList-favoriteItem-header-closeElement')
  closeFavoriteElement.id = 'closeElement';
  closeFavoriteElement.innerHTML = '<i class="fas fa-times-circle"></i>'

  //Creamos el span con el nombre de la serie
  // const favoriteSearchedTitle = document.createElement('span');
  // favoriteSearchedTitle.classList.add('main__lists__favoriteList-favoriteItem-header-span');
  // favoriteSearchedTitle.innerHTML = serie.title;

  //Creamos la imagen
  const favoriteSearchedImage = document.createElement('img');
  favoriteSearchedImage.classList.add('main__lists__favoriteList-favoriteItem-header-image');
  favoriteSearchedImage.src = serie.image;

  //Introducimos los elementos en sus respectivos padres
  favoriteSearchedItem.appendChild(closeFavoriteElement);
  //favoriteSearchedItem.appendChild(favoriteSearchedTitle);
  favoriteSearchedItem.appendChild(headerLiContainer);
  favoriteSearchedItem.appendChild(favoriteSearchedImage);
  favoriteSearched.appendChild(favoriteSearchedItem);
  listDivElement.appendChild(favoriteSearched);

  //Función para borrar
  closeFavoriteElement.addEventListener('click', removeFavoriteClass);
  }
}

function removeFavoriteClass (event) {
  event.preventDefault;
  const serieElement = event.currentTarget.parentElement;

    for(let i = 0; i < favSeriesArray.length; i++) {
      const serie = favSeriesArray[i];
      
      //Comprobamos por el id si el elemento ya está en el array y si es así, lo quitamos del array y de lo guardado en localstore
      if (serie.id === serieElement.id) {
        favSeriesArray.splice(i, 1); 
        const li = document.getElementById(serie.id);
        li.classList.remove('favorite');
        const favseries = JSON.stringify(favSeriesArray);
        localStorage.setItem('favorites', favseries);

        removeFavSerie();
      }
    }
    //Llamamos a getfavorites otra vez para que nos actualice los items pintados a partir del localstore
     getFavorites()
  }

  const favSeries = JSON.parse(localStorage.getItem('favorites'));

function getFavorites() {
  const favSeries = JSON.parse(localStorage.getItem('favorites'));
  if (favSeries.length > 0 ) {
    favSeriesArray = favSeries;
    header.style.height = "140px";
  } 
  //Para que la lista no se pinte más de una vez, la reemplazamos borrándola antes (comprobamos primero que exista la lista de favoritos)
  if(listDivElement.childNodes.length===3) {
  //console.log(listDivElement.childNodes);
  listDivElement.removeChild(listDivElement.childNodes[2]);
  printFavoriteList(favSeries);
  //console.log(listDivElement.childNodes);
}
  else {
    printFavoriteList(favSeries);
    return;
  }
}

window.addEventListener('load', getFavorites);
formElement.addEventListener('submit', handlerSearch);

'use strict';
(() => {
    const APIUrl = 'https://ghibliapi.herokuapp.com/';
    const resultsView = document.getElementById('results');
    const getMoviesButton = document.getElementById('allmovies')

    getMoviesButton.addEventListener('click', getAllMovies);

    
    function getAllMovies() {
        fetch(`${APIUrl}films`)
        .then((response) => response.json())
        .then((data) => displayAllMovies(data));
    }
    
    function getMovieDetails(event) {
        event.preventDefault();
        fetch(`${APIUrl}films/${event.target.getAttribute('data-id')}`)
        .then((result) => result.json())
        .then((data) => displayMovieDetails(data));
    }
    
    function clearResults() {
        while (resultsView.firstChild) {
            resultsView.removeChild(resultsView.firstChild);
        }
        getMoviesButton.style.display = '';
    }

    function displayAllMovies(data) {
        clearResults();
        const list = document.createElement('ul');
        resultsView.appendChild(list);
        data.sort(((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
        data.forEach(movie => {
            const item = document.createElement('li');
            item.innerHTML = `${movie.title}`;
            item.setAttribute('data-id', movie.id);
            item.addEventListener('click', getMovieDetails);
            list.appendChild(item);
        });

        getMoviesButton.style.display = 'none';
    }


    function displayMovieDetails(data) {
        clearResults();
        const fields = ['title', 'release_date', 'director', 'producer', 'description'];
        for (let key of fields) {
            let entry = document.createElement('div');
            entry.innerHTML = data[key];
            entry.className = key;
            resultsView.appendChild(entry);
        }
    }
})();
'use strict';
(() => {
    const APIUrl = 'https://ghibliapi.herokuapp.com/';
    const resultsView = document.getElementById('results');

    // Set up handlers

    document.getElementById('allmovies').addEventListener('click', getAllMovies);

    // Helper functions

    function getAllMovies() {
        fetch(`${APIUrl}films`)
        .then((response) => response.json())
        .then((data) => displayAllMovies(data));
    }

    function clearResults() {
        while (resultsView.firstChild) {
            resultsView.removeChild(resultsView.firstChild);
        }
    }

    function displayAllMovies(data) {
        clearResults();
        const list = document.createElement('ul');
        resultsView.appendChild(list);

        data.forEach(movie => {
            const item = document.createElement('li');
            item.innerHTML = `${movie.title}`;
            item.setAttribute('data-id', movie.id);
            item.addEventListener('click', getMovieDetails);
            list.appendChild(item);
        });
    }

    function getMovieDetails(event) {
        event.preventDefault();
        fetch(`${APIUrl}films/${event.target.getAttribute('data-id')}`)
            .then((result) => result.json())
            .then((data) => displayMovieDetails(data));
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
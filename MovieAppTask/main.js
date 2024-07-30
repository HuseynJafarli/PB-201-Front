const mazeAPI = "https://api.tvmaze.com/shows";
let movieDiv = document.getElementById("MovieDiv");
const searchForm = document.getElementById("search-form-id");
const searchInput = document.getElementById("input-id");
const selectGenre = document.querySelector("#genre-select-id")
let Movies = [];
let allGenres = [];

fetch(mazeAPI)
    .then(response => response.json())
    .then(data => {
        Movies = data;

        CreateGenreOptions()
        DisplayMovies(Movies);
    })
    .catch(error => console.error('Error fetching data:', error));

selectGenre.addEventListener("change", (e) => {
    let value = selectGenre.value;
    if(value != ""){
        let filteredByGenre = Movies.filter(movie => movie.genres.includes(value));
        DisplayMovies(filteredByGenre);
    }
    else{
        DisplayMovies(Movies);
    }
})


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    let filteredMovies = Movies.filter(movie => {
        return movie.name.toLowerCase().includes(query);
    });

    DisplayMovies(filteredMovies);
});


function CreateGenreOptions(){
    Movies.forEach(movie => {
        movie.genres.forEach(genre => {
            allGenres.push(genre);
        })
    })
    let uniqueGenres = allGenres.filter((value, index, array) => array.indexOf(value) === index).sort();

    uniqueGenres.forEach(uniqueGenre => {
        let option = document.createElement("option");
        option.value = uniqueGenre;
        option.innerText = uniqueGenre;
        selectGenre.appendChild(option);
    })
}

function DisplayMovies(movies) {
    movieDiv.innerHTML = "";
    movies.forEach(movie => {
        movieDiv.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${movie.image?.medium}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                      <h5 class="card-title">${movie.name}</h5>
                      <p class="card-text">Premiere: ${movie.premiered}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Language: ${movie.language}</li>
                      <li class="list-group-item">Genres: ${movie.genres.join(', ')}</li>
                      <li class="list-group-item">Rating: ${movie.rating.average}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${movie.officialSite}" class="btn btn-primary" target="_blank">Go to website</a>
                        <button class="btn btn-success" onclick="window.location.href='second.html?id=${movie.id}'">Go to details</button>
                    </div>
                </div>
            </div>`;
    });
}

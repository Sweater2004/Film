/******************************header */
(function ($) {
  $.fn.menumaker = function (options) {
    var cssmenu = $(this),
      settings = $.extend(
        {
          format: "dropdown",
          sticky: false
        },
        options
      );
    return this.each(function () {
      $(this)
        .find(".button")
        .on("click", function () {
          $(this).toggleClass("menu-opened");
          var mainmenu = $(this).next("ul");
          if (mainmenu.hasClass("open")) {
            mainmenu.slideToggle().removeClass("open");
          } else {
            mainmenu.slideToggle().addClass("open");
            if (settings.format === "dropdown") {
              mainmenu.find("ul").show();
            }
          }
        });
      cssmenu.find("li ul").parent().addClass("has-sub");
      multiTg = function () {
        cssmenu
          .find(".has-sub")
          .prepend('<span class="submenu-button"></span>');
        cssmenu.find(".submenu-button").on("click", function () {
          $(this).toggleClass("submenu-opened");
          if ($(this).siblings("ul").hasClass("open")) {
            $(this).siblings("ul").removeClass("open").slideToggle();
          } else {
            $(this).siblings("ul").addClass("open").slideToggle();
          }
        });
      };
      if (settings.format === "multitoggle") multiTg();
      else cssmenu.addClass("dropdown");
      if (settings.sticky === true) cssmenu.css("position", "fixed");
      resizeFix = function () {
        var mediasize = 1000;
        if ($(window).width() > mediasize) {
          cssmenu.find("ul").show();
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find("ul").hide().removeClass("open");
        }
      };
      resizeFix();
      return $(window).on("resize", resizeFix);
    });
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("#cssmenu").menumaker({
      format: "multitoggle"
    });
  });
})(jQuery);

/**film */
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
/***API FILM */


const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const array_pagin_popular = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const API_URL_BEST =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
const array_pagin_best = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const API_URL_AWAIT =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const array_pagin_await = [];


const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"





buttonSmenStran(array_pagin_best);
getMovies(API_URL_BEST);




function buttonSmenStran(mass) {
  document.querySelector(".paginations").innerHTML = "";
  const elPgaination = document.querySelector(".paginations");
  mass.forEach(element => {
    const paf_el = document.createElement("paginations");
    paf_el.classList.add("paginations");
    paf_el.innerHTML = `
        <button class="pagination_button">${element}</button>
        `
    elPgaination.appendChild(paf_el);

  }
  )
}

var API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=";


const a_top_popular = document.getElementById("a__top__popular")
a_top_popular.addEventListener("click", function () {
  API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
  buttonSmenStran(array_pagin_popular);
  getMovies(API_URL_POPULAR);
});


document.getElementById("a__top__await").onclick = function () {
  API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=";
  buttonSmenStran(array_pagin_await);
  getMovies(API_URL_AWAIT);
};

document.getElementById("a__top__best").onclick = function () {
  API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=";
  buttonSmenStran(array_pagin_best);
  getMovies(API_URL_BEST);
};

document.addEventListener('click', function (event) {
  if ([...event.target.classList].includes("pagination_button")) {
    var y = event.target.textContent;
    stran = y;
    console.log(stran)
    const APIU_RL_RESULT = API_URL + stran;
    getMovies(APIU_RL_RESULT);
    event.target.style.backgroundColor = "rgb(240,240,240,0.3)";
  } else {
    console.log(event.target)
  }
});
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
        ${movie.rating &&
      `
        <div class="movie__average movie__average--${getClassByRate(
        movie.rating
      )}">${movie.rating}</div>
        `
      }
      </div>
        `;

    movieEl.addEventListener("click", () => openModal(movie.filmId))
    moviesEl.appendChild(movieEl);

  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
        ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${respData.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
})

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
})






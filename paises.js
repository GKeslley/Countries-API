import initInfosPaises from "./infosPaises.js";

export default function initCountriesAPI() {
  const elementCountries = document.querySelector(".countries");

  async function countriesAPI() {
    const countriesFetch = await fetch("https://restcountries.com/v2/all");
    const jsonCountries = await countriesFetch.json();

    const inputCountrie = document.getElementById("search");
    const selectRegion = document.getElementById("region");
    const colorModes = document.querySelector(".colorMode");

    const darkBackground = "hsl(207, 26%, 17%)";
    const lightBackground = "none";
    const classLightMode = "lightMode";

    function changeColorMode(event) {
      event.preventDefault();
      document.body.classList.toggle(classLightMode);

      if (document.body.classList.contains(classLightMode)) {
        document.documentElement.style.background = lightBackground;
        colorModes.innerText = "Light Mode";
        localStorage.setItem(classLightMode, true);
      } else {
        document.documentElement.style.background = darkBackground;
        colorModes.innerText = "Dark Mode";
        localStorage.setItem(classLightMode, false);
      }
    }

    colorModes.addEventListener("click", changeColorMode);

    function checkLocalStorageMode() {
      if (localStorage.getItem(classLightMode) === "true") {
        document.documentElement.style.background = lightBackground;
        colorModes.innerText = "Light Mode";
        document.body.classList.add(classLightMode);
      } else {
        document.documentElement.style.background = darkBackground;
        colorModes.innerText = "Dark Mode";
        document.body.classList.remove(classLightMode);
      }
    }
    checkLocalStorageMode();

    const countriesSpread = [...jsonCountries].map((countrie) => {
      const elementA = document.createElement("a");
      const elementDiv = document.createElement("div");
      const elementImg = document.createElement("img");
      elementImg.src = countrie.flag;

      if (inputCountrie && selectRegion) {
        function searchCountrie() {
          inputCountrie.addEventListener("keyup", (event) => {
            event.target.value = `${event.target.value
              .slice(0, 1)
              .toUpperCase()}${event.target.value.slice(1)}`;
            if (countrie.name.includes(event.target.value)) {
              elementA.style.display = "block";
            } else elementA.style.display = "none";
          });
        }

        function filterRegion() {
          selectRegion.addEventListener("change", () => {
            const selectOption =
              selectRegion.options[selectRegion.selectedIndex].text;

            if (countrie.region.includes(selectOption)) {
              elementA.style.display = "block";
            } else elementA.style.display = "none";
          });
        }

        searchCountrie();
        filterRegion();

        function addTextInHTML() {
          elementDiv.innerHTML = `<h1>${
            countrie.name
          }</h1> <p>Population: <span>${
            countrie.population
          }</span></p> <p>Capital: <span>${
            countrie.capital || "No exist"
          }</span></p> <p>Region: <span>${
            countrie.region || "No exist"
          }</span></p>`;

          elementA.setAttribute("href", "./infos.html");
          elementA.classList.add("countrie");
          elementA.appendChild(elementImg);
          elementA.appendChild(elementDiv);
          elementCountries.appendChild(elementA);

          elementA.addEventListener("click", () =>
            localStorage.setItem("selectedCountrie", JSON.stringify(countrie))
          );
        }

        addTextInHTML();
      }

      return countrie;
    });

    initInfosPaises(countriesSpread);
  }
  countriesAPI();
}

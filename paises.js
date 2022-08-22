import initInfosPaises from "./infosPaises.js";

export default function initCountriesAPI() {
  const elementCountries = document.querySelector(".countries");

  async function countriesAPI() {
    const countriesFetch = await fetch("https://restcountries.com/v2/all");
    const jsonCountries = await countriesFetch.json();

    const countriesSpread = [...jsonCountries].map((countrie) => {
      const elementA = document.createElement("a");
      const elementDiv = document.createElement("div");
      const elementImg = document.createElement("img");
      elementImg.src = countrie.flag;

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

      return countrie;
    });

    initInfosPaises(countriesSpread);
  }
  countriesAPI();
}

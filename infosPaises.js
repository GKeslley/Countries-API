export default function initInfosPaises(countries) {
  const countrieString = localStorage.getItem("selectedCountrie");
  const countrieObject = JSON.parse(countrieString);

  if (document.body.classList.contains("infos")) {
    const imgCountrie = document.querySelector(".picture");
    const ulCountrie = document.querySelector(".infos-pais");
    const li = document.createElement("li");
    const secondLi = document.createElement("li");
    const h1 = document.createElement("h1");
    h1.innerHTML = countrieObject.name;

    const booleanCapital = countrieObject.capital
      ? countrieObject.capital
      : (countrieObject.capital = "No exist");

    const booleanCurrencie = countrieObject.currencies
      ? countrieObject.currencies[0].name
      : (countrieObject.currencies = "No exist");

    const languagesTotal = countrieObject.languages.map((name) => name.name);

    const languages = languagesTotal.join();

    li.innerHTML = `<p>Population: <span>${countrieObject.population}</span></p> <p>Region: <span> ${countrieObject.region}</span></p> <p>Sub Region: <span>${countrieObject.subregion}</span></p> <p>Capital: <span>${booleanCapital}</span></p>`;

    secondLi.innerHTML = `<p>Top Level Domain: <span>${
      countrieObject.topLevelDomain
    }</span></p> <p>Currencies: <span>${booleanCurrencie}</span></p> <p>Languages: <span>${languages
      .split(",")
      .join(", ")}</span></p>`;

    ulCountrie.appendChild(h1);
    ulCountrie.appendChild(li);
    ulCountrie.appendChild(secondLi);

    imgCountrie.src = countrieObject.flag;

    const bordersElement = document.querySelector(".borders");

    if (countrieObject.borders) {
      countrieObject.borders.forEach((element) => {
        const bordersLiElements = document.createElement("a");
        bordersLiElements.setAttribute("href", "./infos.html");
        bordersLiElements.innerText = element;
        bordersElement.appendChild(bordersLiElements);

        bordersLiElements.addEventListener("click", () => {
          countries.forEach((countrieCode) => {
            if (countrieCode.alpha3Code === element) {
              localStorage.setItem(
                "selectedCountrie",
                JSON.stringify(countrieCode)
              );
            }
          });
        });
      });
    }
  }
}

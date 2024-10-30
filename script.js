"use strict";
const body = document.querySelector("body");

const flexing = (element) => {
  element.style.display = "flex";
  element.style.justifyContent = "space-between";
  element.style.alignItems = "center";
};
// create element
const header = document.createElement("header");
const nav = document.createElement("nav");
// nav left side create
const title = document.createElement("h1");
// nav right side create
const mod = document.createElement("button");
const modIcon = document.createElement("img");
const modDescription = document.createElement("p");
// search and filter section
const editContainer = document.createElement("div");
const search = document.createElement("input");
// filter
const filter = document.createElement("select");
const filterOption1 = document.createElement("option");
const filterOption2 = document.createElement("option");
const filterOption3 = document.createElement("option");
const filterOption4 = document.createElement("option");
const filterOption5 = document.createElement("option");
const filterOption6 = document.createElement("option");

// add class or id or attribute
search.setAttribute("placeholder", "Search for a country...");

filterOption1.textContent = "Africa";
filterOption1.value = "Africa";
filterOption2.textContent = "Americas";
filterOption2.value = "Americas";
filterOption3.textContent = "Asia";
filterOption3.value = "Asia";
filterOption4.textContent = "Europe";
filterOption4.value = "Europe";
filterOption5.textContent = "Oceania";
filterOption5.value = "Oceania";
filterOption6.textContent = "all";
filterOption6.value = "all";

// styles
header.style.height = "10rem";
nav.style.backgroundColor = "#eeeeee";

nav.style.height = "100%";
flexing(nav);
nav.style.padding = "0 5rem";
nav.style.borderBottom = "1px solid black";

title.textContent = "Where in the world?";
title.style.fontSize = "3rem";

flexing(mod);
mod.style.width = "15rem";
mod.style.height = "5rem";
mod.style.padding = "0 1rem";
mod.style.border = "none";
mod.style.backgroundColor = "inherit";
mod.style.cursor = "pointer";

modDescription.textContent = "Dark Mode";
modDescription.style.fontSize = "1.8rem";

modIcon.src = "./assets/icons/moon.svg";
modIcon.style.width = "3rem";

editContainer.style.height = "10rem";
flexing(editContainer);
editContainer.style.padding = "0 5rem";

search.style.border = "none";
search.style.outline = "none";
search.style.borderRadius = "0.5rem";
search.style.padding = " 1rem 1.5rem";
search.style.boxShadow = " 2px 2px 11px 2px rgba(184,184,184,1)";
search.style.fontSize = "1.6rem";

filter.style.border = "none";
filter.style.outline = "none";
filter.style.width = "15rem";
filter.style.borderRadius = "0.5rem";
filter.style.padding = " 1rem 1.5rem";
filter.style.boxShadow = " 2px 2px 11px 2px rgba(184,184,184,1)";
filter.style.fontSize = "1.6rem";

filterOption6.setAttribute("selected", "selected");
// adding to page
body.prepend(header);
header.appendChild(nav);
nav.append(title, mod);
mod.append(modIcon, modDescription);
body.appendChild(editContainer);
header.insertAdjacentElement("afterend", editContainer);
editContainer.appendChild(search);
editContainer.appendChild(filter);
filter.appendChild(filterOption1);
filter.appendChild(filterOption2);
filter.appendChild(filterOption3);
filter.appendChild(filterOption4);
filter.appendChild(filterOption5);
filter.appendChild(filterOption6);

// counties container
const container = document.createElement("div");
container.classList.add("container");
container.style.padding = "0 5rem";
container.style.display = "flex";
container.style.flexWrap = "wrap";
editContainer.insertAdjacentElement("afterend", container);

// fetch
const data = async function () {
  try {
    const info = await fetch(" https://restcountries.com/v3.1/all ");
    const countries = await info.json();
    console.log(countries);

    return countries;
  } catch (error) {
    alert(error.message);
  }
};
data().then((countries) => {
  countries.forEach((country) => {
    // create cart
    const cart = document.createElement("div");
    const cartTop = document.createElement("div");
    const cartImg = document.createElement("img");
    const cartBottom = document.createElement("div");
    const cartTitle = document.createElement("h2");
    const population = document.createElement("p");
    const region = document.createElement("p");
    const capital = document.createElement("p");

    cart.classList.add("cart");
    cart.setAttribute("data-name", country.name.common);
    cart.setAttribute("data-region", country.region);
    cart.setAttribute("data-neighbors", country.borders);
    const nativeName = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].official
      : "N/A";
    cart.setAttribute("data-subregion", country.subregion || "N/A");

    cart.setAttribute("data-native-name", nativeName);
    cartImg.src = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;
    cartBottom.id = "cartBottom";
    cartTitle.textContent = country.name.common;
    population.classList.add("population");
    population.textContent = `Population: ${country.population}`;
    region.textContent = `Region: ${country.region}`;
    capital.textContent = `Capital: ${country.capital}`;

    // style
    cartTop.style.height = "50%";
    cartImg.style.width = "100%";
    cartImg.style.height = "100%";
    cartImg.style.objectFit = "cover";

    cartBottom.style.height = "50%";

    cartTitle.style.fontSize = "2.5rem";
    cartTitle.style.margin = "2rem 3rem";

    population.style.fontSize = "1.8rem";
    population.style.margin = "1rem 3rem";

    region.style.fontSize = "1.8rem";
    region.style.margin = "1rem 3rem";

    capital.style.fontSize = "1.8rem";
    capital.style.margin = "1rem 3rem";

    container.append(cart);
    cart.append(cartTop);
    cartTop.appendChild(cartImg);
    cart.append(cartBottom);
    cartBottom.appendChild(cartTitle);
    cartBottom.appendChild(population);
    cartBottom.appendChild(region);
    cartBottom.appendChild(capital);
    cart.addEventListener("click", () => openModal(cart));
  });
});

// filter
filter.addEventListener("change", function (e) {
  const CartsItem = document.querySelectorAll(".cart");
  CartsItem.forEach((item) => {
    item.style.display = "none";
    if (item.dataset.region === e.target.value || e.target.value === "all") {
      item.style.display = "block";
    }
  });
});

// search
search.addEventListener("keyup", function (e) {
  const allCards = document.querySelectorAll(".cart");
  const selectRegion = filter.value.toLowerCase();

  allCards.forEach((cart) => {
    const userSearch = cart.dataset.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
    const matchesRegion =
      selectRegion === "all" ||
      cart.dataset.region.toLowerCase() === selectRegion;

    if (userSearch && matchesRegion) {
      cart.style.display = "block";
    } else {
      cart.style.display = "none";
    }
  });
});

// modal
const openModal = (country) => {
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeButton = document.createElement("button");

  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.fontSize = "1.5rem";

  modalContent.style.position = "relative";
  modalContent.style.display = "flex";
  modalContent.style.padding = "5rem";
  modalContent.style.backgroundColor = "#fff";

  closeButton.textContent = "Back";
  closeButton.style.position = "absolute";
  closeButton.style.top = "1rem";
  closeButton.style.left = "2rem";
  closeButton.style.width = "10rem";
  closeButton.style.height = "2.5rem";
  closeButton.style.backgroundColor = "#fff";
  closeButton.style.boxShadow = "2px 2px 11px 2px rgba(184,184,184,1)";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";

  if (!modeFlag) {
    modal.style.backgroundColor = "hsl(209, 23%, 22%)";
    modalContent.style.backgroundColor = "hsl(209, 23%, 22%)";
    modalContent.style.color = "#fff";
    closeButton.style.backgroundColor = "hsl(209, 26%, 23%)";
    closeButton.style.color = "#fff";
  } else {
    modal.style.backgroundColor = "rgb(255, 255, 255)";
    modalContent.style.backgroundColor = "#fff";
    modalContent.style.color = "#000";
    closeButton.style.backgroundColor = "#fff";
    closeButton.style.color = "#000";
  }

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.removeChild(modal);
  });

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const countryName = country.querySelector("h2").textContent;
  const population = country.querySelector("p:nth-child(2)").textContent;
  const region = country.querySelector("p:nth-child(3)").textContent;
  const capital = country.querySelector("p:nth-child(4)").textContent;
  const flagSrc = country.querySelector("img").src;

  const neighborsData = country.getAttribute("data-neighbors") || "";
  const neighbors = neighborsData ? neighborsData.split(",") : [];

  const flagImage = document.createElement("img");
  const textContainer = document.createElement("div");
  const title = document.createElement("h2");
  const nativeText = document.createElement("p");
  const populationText = document.createElement("p");
  const regionText = document.createElement("p");
  const capitalText = document.createElement("p");
  const neighborsTitle = document.createElement("p");

  flagImage.src = flagSrc;
  flagImage.style.maxWidth = "50%";
  flagImage.style.marginBottom = "1rem";
  textContainer.style.display = "flex";
  textContainer.style.width = "60%";
  textContainer.style.flexDirection = "column";
  textContainer.style.marginLeft = "2rem";
  title.textContent = countryName;
  title.style.margin = "1rem 0";
  title.style.fontSize = "3rem";
  const nativeName = country.getAttribute("data-native-name");
  nativeText.textContent = `native name : ${nativeName}`;
  nativeText.style.margin = "1rem 0";
  nativeText.style.fontSize = "1.7rem";
  populationText.textContent = population;
  populationText.style.margin = "1rem 0";
  populationText.style.fontSize = "1.7rem";
  regionText.textContent = region;
  regionText.style.margin = "1rem 0";
  regionText.style.fontSize = "1.7rem";
  const subregion = country.getAttribute("data-subregion");
  const subregionText = document.createElement("p");
  subregionText.textContent = `subregion: ${subregion}`;
  subregionText.style.margin = "1rem 0";
  subregionText.style.fontSize = "1.7rem";
  capitalText.textContent = capital;
  capitalText.style.margin = "1rem 0";
  capitalText.style.fontSize = "1.7rem";

  modalContent.appendChild(flagImage);
  modalContent.appendChild(textContainer);
  textContainer.appendChild(title);
  textContainer.appendChild(nativeText);
  textContainer.appendChild(populationText);
  textContainer.appendChild(regionText);
  textContainer.appendChild(subregionText);
  textContainer.appendChild(capitalText);

  if (neighbors.length > 0) {
    const neighborsWrapper = document.createElement("div");
    neighborsWrapper.style.display = "flex";
    neighborsWrapper.style.alignItems = "center";

    neighborsTitle.textContent = "Border Countries:";
    neighborsTitle.style.margin = "1rem";
    neighborsTitle.style.fontSize = "1.7rem";
    neighborsWrapper.appendChild(neighborsTitle);

    neighbors.forEach((neighbor) => {
      const neighborContainer = document.createElement("div");
      const neighborText = document.createElement("p");

      neighborText.textContent = neighbor;
      neighborText.style.margin = "0 0.5rem";
      neighborContainer.appendChild(neighborText);
      neighborsWrapper.appendChild(neighborContainer);
    });

    textContainer.appendChild(neighborsWrapper);

    textContainer.appendChild(neighborsWrapper);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

// Dark mode
let modeFlag = true;
mod.addEventListener("click", function () {
  const carts = document.querySelectorAll(".cart");

  if (modeFlag) {
    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    nav.style.backgroundColor = "hsl(209, 23%, 22%)";
    nav.style.color = "#fff";
    mod.style.color = "#fff";
    modIcon.src = "./assets/icons/sun.svg";
    modDescription.textContent = "Light Mode";
    search.style.backgroundColor = "hsl(209, 23%, 22%)";
    search.style.color = "#fff";
    filter.style.backgroundColor = "hsl(209, 23%, 22%)";
    filter.style.color = "#fff";
    carts.forEach((cart) => {
      cart.style.backgroundColor = "hsl(209, 23%, 22%)";
      cart.style.color = "#fff";
    });
    modeFlag = false;
  } else {
    body.style.backgroundColor = "#fff";
    nav.style.backgroundColor = "#eeeeee";
    nav.style.color = "black";
    mod.style.color = "black";
    modIcon.src = "./assets/icons/moon.svg";
    modDescription.textContent = "Dark Mode";
    search.style.backgroundColor = "#fff";
    search.style.color = "black";
    modDescription.textContent = "Light Mode";
    search.style.backgroundColor = "#fff";
    search.style.color = "black";
    filter.style.backgroundColor = "#fff";
    filter.style.color = "black";
    carts.forEach((cart) => {
      cart.style.backgroundColor = "#fff";
      cart.style.color = "black";
    });
    modeFlag = true;
  }
});

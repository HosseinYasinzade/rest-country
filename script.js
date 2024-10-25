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
const modDescriptiom = document.createElement("p");

// add class or id
header.classList.add("header");
nav.id = "nav";
title.id = "title";
mod.classList.add("siteMode");
modIcon.id + "headerIcon";
modDescriptiom.classList.add("headerBtnDesc");

// styles
header.style.height = "10rem";

nav.style.height = "100%";
flexing(nav);
nav.style.padding = "0 5rem";

title.textContent = "Where in the world?";
title.style.fontSize = "3rem";

flexing(mod);
mod.style.width = "15rem";
mod.style.height = "5rem";
mod.style.padding = "0 1rem";
mod.style.border = "none";
mod.style.backgroundColor = "inherit";

modDescriptiom.textContent = "Dark Mode";
modDescriptiom.style.fontSize = "1.8rem";

modIcon.src = "./assets/icons/moon.svg";
modIcon.style.width = "3rem";

// adding to page
body.prepend(header);
header.appendChild(nav);
nav.append(title, mod);
mod.append(modIcon, modDescriptiom);

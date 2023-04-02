import { products } from '/data.js';

let favorites = [];

const divElement = function(content, firstProperty, secondProperty, thirdProperty) {
  if (content.details) {
    return `<div id="${content.id}">
              ${firstProperty}
              ${secondProperty}
              ${thirdProperty}
            </div>`;
  } else {
    return `<div>
              ${firstProperty}
              ${secondProperty}
              ${thirdProperty}
            </div>`;
  }
}

const loadEvent = function() {

  // Write your JavaScript code after this line
  const root = document.getElementById("root");

  products.forEach(album => {
    const albumName = `<p><b>name: ${album.name}</b></p>`;
    const albumTaxable = `<b>taxable: ${album.taxable}</b><br>`;
    const albumStatus = `<i><b>status: ${album.status}</b></i>`;
    root.insertAdjacentHTML("beforeend", divElement(album, albumName, albumTaxable, albumStatus));
  });

  products.forEach(album => {
    const divAlbum = document.getElementById(`${album.id}`);
    album.details.forEach((track) => {
      const trackSection = `<section>Name: ${track.name}</section>`;
      const trackButton = `<button>Unit Price: ${track.unit_price}</button>`;
      const trackHeader = `<header>Time Span: ${track.milliseconds}</header>`;
      divAlbum.insertAdjacentHTML("beforeend", divElement(track, trackSection, trackButton, trackHeader));
    })
  });

  products.forEach(album => {
    const divAlbum = document.getElementById(`${album.id}`);
    divAlbum.insertAdjacentHTML("afterbegin", "<button style='font-size:3em;'>+</button>");
  });
  
  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const getParentId = button.parentElement.id;
      const getAlbumOfParent = products.find(album => album.id == getParentId);

      if (button.innerText === "+") {
        favorites.push(getAlbumOfParent);
        button.innerText = "-";
      } else if (button.innerText === "-") {
        favorites = favorites.filter(albumObject => albumObject !== getAlbumOfParent);
        button.innerText = "+";
      }
    });
  });

  // Write your JavaScript code before this line

}

window.addEventListener("load", loadEvent);

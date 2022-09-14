import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const createElements = (array) => {
  return array.reduce((acc, { preview, original, description }) => {
    return (
      acc +
      `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}" 
      alt="${description}"
    />
  </a>`
    );
  }, "");
};

const pictures = createElements(galleryItems);

const mainContainer = document.querySelector(".gallery");
mainContainer.classList.add("gallery__item");

mainContainer.insertAdjacentHTML("beforeend", pictures);

mainContainer.addEventListener("click", onClickPicture);

function onClickPicture(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  // бібліотека basicLightbox
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  document.addEventListener("keydown", onClosePicture);

  function onClosePicture(event) {
    document.removeEventListener("keydown", onClosePicture);
    if (event.code === "Escape") {
      instance.close();
    }
  }
}


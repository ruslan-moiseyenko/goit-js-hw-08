// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryWrap = document.querySelector(".gallery");

galleryItems.forEach(({ preview, original, description }) => {
  galleryWrap.insertAdjacentHTML('beforeend', `
        <div>
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </div>
        `);
});


const lightbox = new SimpleLightbox('.gallery a');
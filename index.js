const loader = document.querySelector(".loader-container");
const container = document.querySelector(".container");

const svgIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="download"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>`;

const accessKey = "bOmWUNA52SyWN5ZXLLOQfJyWZRFj7VVn3iqyU9tZbhE";
const secretKey = "r6Ij4q4LNUeA1AeMcUklYOJVP7PERs7kxkWhqtq9keA";
const count = 30;
let photosArray = [];
let ready = false;
let imagesLoads = 0;
let totalImages = 0;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

function imageLoaded() {
  loader.hidden = true;
  imagesLoads++;
  console.log(imagesLoads);
  if ((imagesLoads = totalImages)) {
    ready = true;
    console.log("ready", ready);
  }
}

function displayPhotos() {
  imagesLoads = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("div");
    item.setAttribute("class", "image-box");
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");
    const altInfo = document.createElement("span");
    altInfo.setAttribute("class", "alt-info");
    altInfo.textContent = photo.user.name;
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", photo.links.download);
    downloadLink.setAttribute("class", "download-link");
    downloadLink.setAttribute("target", "_blank");
    item.appendChild(image);
    item.appendChild(overlay);
    overlay.appendChild(altInfo);
    downloadLink.insertAdjacentHTML("afterbegin", svgIcon);
    overlay.appendChild(downloadLink);
    container.appendChild(item);
    image.addEventListener("load", imageLoaded);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    //  console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// check if scrollbar at bottom then get photos again

document.addEventListener("scroll", (scroll) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    //  console.log("getting photos again");
  }
});

getPhotos();

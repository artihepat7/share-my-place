import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleElement = document.querySelector("header h1");
    //console.log(headerTitleElement);
    headerTitleElement.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams; //it gives key:value pair from url
const coords = {
  lat: +queryParams.get("lat"), //parsing becouse bydefault it will give string
  lng: parseFloat(queryParams.get("lng")),
};
const address = queryParams.get("address");

new LoadedPlace(coords, address);

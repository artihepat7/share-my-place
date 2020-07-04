//accessing buttons first find place and getCurrent location
import { Map } from "./UI/Map";
import { Modal } from "./UI/Modal";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class placeFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");

    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value)
    .then(() => {
      alert('Copied into clipboard');
    })
    .catch((error) => {
      console.log(error);
      sharedLinkInputElement.select();
    })
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    const sharedLinkInputElement = document.getElementById("share-link");
    sharedLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more modern browser or manually enter an address"
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        //console.log(successResult);
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        //console.log(coordinates);
        //console.log(this)
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(
          "could not locate you unfortunately - please enter address manually"
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    //console.log(event.target);
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

new placeFinder();

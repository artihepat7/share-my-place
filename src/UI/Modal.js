export class Modal {
  constructor(contentID, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentID);
    this.modalTemplateEl = document.getElementById("modal-template");
  }
  show() {
    if ("content" in document.createElement("template")) {//template not supported in IE
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");
      const contentElements = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElements);

      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
      if(this.modalElement){
          document.body.removeChild(this.modalElement);
          document.body.removeChild(this.backdropElement);
          this.modalElement = null;
          this.backdropElement = null;
      }
  }
}

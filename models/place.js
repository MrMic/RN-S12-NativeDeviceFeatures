class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // * NOTE: { lat: 0.12255, lng: 151.20732 }
    this.id = new Date().toString() + Math.random().toString();
  }
}

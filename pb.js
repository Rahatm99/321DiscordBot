const Pixelbin = require("@pixelbin/core").default;
const {transformations} = require("@pixelbin/core/lib/cjs/transformations/Basic");

const pixelbin = new Pixelbin({
    cloudName: "demo",
    zone: "default", // optional
  });

const t2 = transformations.flip();

const demoImage = pixelbin.image("path/to/image");

demoImage.setTransformation(t1.pipe(t2));

console.log(demoImage.getUrl());
import React from "react";
import {
  ShimmerContentBlock,
  ShimmerPostItem,
  
} from "react-shimmer-effects";

const ShimmerProductPage = () => {
  return (
    <ShimmerContentBlock
      title
      text
      cta
      thumbnailWidth={400}
      thumbnailHeight={400}
    />
  );
};

const ShimmerProduct = () => {
  return (
    <ShimmerPostItem
      title={true}
      text = {true}
    cta={true}
      imageType="thumbnail"
      imageWidth={80}
      imageHeight={80}   
    />
  );
};

export { ShimmerProductPage, ShimmerProduct };

import { Image } from "@heroui/react";

const BannerImage = ({ src }) => (
  <div className="pt-12 sm:pt-20">
    <Image radius="none" src={src} />
  </div>
);
export default BannerImage;

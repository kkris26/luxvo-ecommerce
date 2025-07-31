import HeadingTitle from "../Products/HeadingTitle";
import LabelTitle from "../Products/LabelTitle";

const SectionTitle = ({ label, title }) => (
  <div className="flex flex-col gap-1 items-center">
    <LabelTitle>{label}</LabelTitle>
    <HeadingTitle>{title}</HeadingTitle>
  </div>
);
export default SectionTitle;

import PropTypes from "prop-types";

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

Image.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;

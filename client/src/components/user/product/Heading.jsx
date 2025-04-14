import PropTypes from "prop-types";

const Heading = ({ heading }) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Heading;

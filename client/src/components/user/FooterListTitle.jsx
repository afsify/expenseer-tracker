import PropTypes from "prop-types";

const FooterListTitle = ({ title }) => {
  return <h3 className="text-xl font-bodyFont font-semibold mb-6">{title}</h3>;
};

FooterListTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterListTitle;

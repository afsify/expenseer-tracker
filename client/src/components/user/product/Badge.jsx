import PropTypes from "prop-types";

const Badge = ({ text }) => {
  return (
    <div className="bg-primeColor w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-black duration-300 cursor-pointer">
      {text}
    </div>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Badge;

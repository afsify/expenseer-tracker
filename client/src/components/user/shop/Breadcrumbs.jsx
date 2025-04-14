import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  const handleNavigate = () => {
    if (prevLocation) {
      navigate(
        prevLocation.toLowerCase() === "home" ? "/" : `/${prevLocation}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span
          className={`cursor-pointer ${
            prevLocation ? "text-primeColor hover:underline" : "text-lightText"
          }`}
          onClick={handleNavigate}
        >
          {prevLocation === "" ? "Home" : prevLocation}
        </span>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

Breadcrumbs.propTypes = {
  prevLocation: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Breadcrumbs;

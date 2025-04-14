import PropTypes from "prop-types";
import { Image as AntImage } from "antd";
import links from "../../assets/links";

function LoginCard({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-4xl p-5 m-1 items-center">
        <div className="md:w-1/2 px-8 md:px-14">{children}</div>
        <div className="md:flex hidden w-1/2">
          {links?.auth ? (
            <img className="rounded-2xl" src={links.auth} alt="Auth" />
          ) : (
            <div className="flex items-center rounded-2xl justify-center bg-gray-300 animate-pulse w-[482px] h-[557px]">
              <AntImage
                preview={false}
                src={links.horizontal}
                alt="Image Skeleton"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

LoginCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginCard;

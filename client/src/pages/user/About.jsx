import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserLayout from "../../layout/UserLayout";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/user/shop/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <UserLayout>
      <motion.div
        className="max-w-container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumbs title="About" prevLocation={prevLocation} />
        <div className="pb-10">
          <motion.h1
            className="text-4xl font-bold text-primeColor mb-6"
            variants={itemVariants}
          >
            Ruramart Directory
          </motion.h1>
          <motion.p
            className="text-gray-700 leading-relaxed mb-6"
            variants={itemVariants}
          >
            Ruramart is a comprehensive e-commerce platform designed to empower
            rural businesses. It provides an online presence for shops in rural
            areas, enabling them to reach a broader audience and showcase their
            unique offerings. Through Ruramart, customers can easily discover,
            review, and purchase products from local vendors.
          </motion.p>
          <motion.p
            className="text-gray-700 leading-relaxed mb-6"
            variants={itemVariants}
          >
            Our platform features intuitive user registration and management,
            detailed product listings, and seamless order processing. Ruramart
            also includes robust review and cart management systems, making it
            easy for customers to shop with confidence and convenience.
          </motion.p>
          <motion.p
            className="text-gray-700 leading-relaxed mb-6"
            variants={itemVariants}
          >
            By connecting rural shops with potential customers, Ruramart bridges
            the gap between tradition and technology, fostering economic growth
            and supporting small businesses.
          </motion.p>
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <Link to="/shop">
              <motion.button className="px-6 py-3 bg-primeColor text-white text-lg font-medium hover:bg-black transition duration-300">
                Explore Shop
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </UserLayout>
  );
};

export default About;

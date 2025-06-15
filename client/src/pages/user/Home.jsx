import { motion } from "framer-motion";
import Banner from "../../components/user/Banner";
import UserLayout from "../../layout/UserLayout";
import NewArrival from "../../components/user/home/NewArrival";

function Home() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <UserLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Banner />
        <div className="max-w-container mx-auto px-4">
          <NewArrival />
        </div>
      </motion.div>
    </UserLayout>
  );
}

export default Home;

const hook = "./assets/images/hook.png";
const down = "./assets/images/down.png";
const line = "./assets/images/line.png";
import { motion } from "framer-motion";
import "./Banner.scss";

const Banner = () => {
  const bannerVariants = {
    hidden: { opacity: 0, x: -100 }, // Chap tomondan boshlanadi
    visible: { opacity: 1, x: 0 }, // Asl holat
  };

  const viewVariants = {
    hidden: { opacity: 0, x: 100 }, // O'ng tomondan boshlanadi
    visible: { opacity: 1, x: 0 }, // Asl holat
  };
  return (
    <div className="banner">
      <img src={hook} alt="" />
      <div className="container">
        <div className="bannerBody">
          <motion.div
            className="bannerTexts"
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
            transition={{ duration: 1.2 }} // Animatsiya davomiyligi
          >
            <h1>
              Lorem, ipsum dolor sit amet consectetur <span>adipisicing.</span>
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              quibusdam dolorum, cum aperiam beatae repellat ab rerum commodi
              perspiciatis alias.
            </p>

            <button>See more</button>
            <motion.img
              src={down}
              alt="down arrow"
              initial={{ y: 20 }}
              animate={{ y: 40 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
              className="down-arrow"
            />
          </motion.div>

          <motion.div
            className="bannerView"
            initial="hidden"
            animate="visible"
            variants={viewVariants}
            transition={{ duration: 1.2 }}>
            <iframe
              src="https://www.youtube.com/embed/JfbtySq6_B4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"></iframe>
            <div className="blur">
              {" "}
              <span>Lorem ipsum dolor sit amet, consectetur</span>
            </div>
          </motion.div>
        </div>
      </div>
      <img src={line} alt="" className="line" />
    </div>
  );
};

export default Banner;

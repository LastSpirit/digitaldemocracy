import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { HomeHero, HomeSlider, HomeFeatures } from "../components/home";
import gtm from "../lib/gtm";

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Material Kit Pro</title>
      </Helmet>
      <div>
        <HomeHero />
        <HomeSlider />
        <HomeFeatures />
      </div>
    </>
  );
};

export default Home;

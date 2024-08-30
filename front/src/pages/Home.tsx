import { useEffect, useState } from "react";
import { IFeatureItem } from "../models/IFeatureItem.ts";
import { getFeatureItems } from "../services/getPublicData.ts";
import FeatureItem from "../components/FeatureItem.tsx";

const Home = () => {
  const [featureItems, setFeatureItems] = useState<IFeatureItem[]>();

  useEffect(() => {
    (async () => {
      setFeatureItems(await getFeatureItems());
    })();
  }, []);

  if (!featureItems) return null;
  return (
    <>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>

        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featureItems.map(x =>
            <FeatureItem key={x.id} img={x.img} title={x.title} text={x.text} />)}
        </section>
      </main>
    </>
  );
};

export default Home;
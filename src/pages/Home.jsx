import BikeList from "../components/BikeList";
import Hero from "../components/Hero"
const Home = () => {
  return (
    <>
      <h1 className="text-center mt-4">
        Welcome to Bike Showroom
      </h1>
      <Hero/>
      <BikeList />
    </>
  );
};

export default Home;
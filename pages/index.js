import PlacesList from "../components/PlacesList";
import Slider from "../components/Slider";
import Contact from "../components/Contact";
import Baner from "../components/Baner";

export default function Home() {
  return (
    <>
      <Slider />
      <Baner/>
      <PlacesList/>
      <Contact/>
    </>
  )
}

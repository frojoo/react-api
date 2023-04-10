import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudMeatball,
  FaCloudSunRain,
  FaCloudShowersHeavy,
  FaPooStorm,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

export default function App() {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <FaSun size={100} color="white" />
      <FaCloudSun size={100} color="white" />
      <FaCloud size={100} color="white" />
      <FaCloudMeatball size={100} color="white" />
      <FaCloudSunRain size={100} color="white" />
      <FaCloudShowersHeavy size={100} color="white" />
      <FaPooStorm size={100} color="white" />
      <FaSnowflake size={100} color="white" />
      <FaSmog size={100} color="white" />
    </div>
  );
}

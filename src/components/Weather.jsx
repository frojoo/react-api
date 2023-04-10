import { useEffect, useState } from "react";
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
import axios from "axios";

// 각 날씨에 맞는 아이콘 불러오기(openweather API 순서 기준)
const weatherIcon = {
  "01": <FaSun size={96} />,
  "02": <FaCloudSun size={96} />,
  "03": <FaCloud size={96} />,
  "04": <FaCloudMeatball size={96} />,
  "09": <FaCloudSunRain size={96} />,
  10: <FaCloudShowersHeavy size={96} />,
  11: <FaPooStorm size={96} />,
  13: <FaSnowflake size={96} />,
  50: <FaSmog size={96} />,
};

function Weather() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weatherInfo, setWeatherInfo] = useState();

  //위치 정보 가져오기.
  const getGeolocation = () => {
    //서버와 연결 성공할 때와 실패할 때 설정, try catch

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      () => {
        alert("위치 정보에 동의 해주셔야 합니다.");
      }
    );
  };

  //날씨 정보 가져오기, 비동기 처리, useEffect 안에서 또 비동기 처리하려면 함수를 따로 만들어아함.
  const getWeatherInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );
      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");

        return;
      }
      console.log(response.data);
      setWeatherInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //처음 실행될 때,  lon과 lat 구하기
  useEffect(() => {
    getGeolocation();
  }, []);

  //lat과 lon 값에 따라 실행
  useEffect(() => {
    if (!lat || !lon) return;

    console.log(lat);
    console.log(lon);

    getWeatherInfo();
  }, [lat, lon]);
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* 날씨에 맞는 아이콘 불러오기 */}
      {weatherInfo ? (
        <div className="flex flex-col justify-center items-center">
          {weatherIcon[weatherInfo.weather[0].icon.substring(0, 2)]}
          <div className="mt-5 text-2x">
            {weatherInfo.name}, {weatherInfo.main.temp.toFixed(1)} ℃
          </div>
        </div>
      ) : (
        "날씨 정보를 로딩중입니다 ..."
      )}
    </div>
  );
}

export default Weather;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherCard() {
  const [localtime, setLocaltime] = useState("");
  const [localdate, setLocaldate] = useState("");
  const [CWeather, setCWeather] = useState("");
  const [CWeatherIcon, setCWeatherIcon] = useState("");
  const [temp, setTemp] = useState("");
  const [press, setPress] = useState("");
  const [wind, setWind] = useState("");
  const [humid, setHumid] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/timezone.json?key=${apiKey}&q=London`
        );
        const [date, time] = response.data.location.localtime.split(" ");
        setLocaltime(time);
        setLocaldate(date);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London&aqi=no`
        );
        const text = response.data.current.condition.text;
        const icon = response.data.current.condition.icon;
        const temprature = response.data.current.temp_c;
        const pressure = response.data.current.pressure_mb;
        const wind = response.data.current.wind_kph;
        const humidity = response.data.current.humidity;
        setCWeather(text);
        setCWeatherIcon(icon);
        setTemp(temprature);
        setPress(pressure);
        setWind(wind);
        setHumid(humidity);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="w-[600px] overflow-hidden  rounded-3xl">
      <div className="flex justify-around items-center bg-pink-500 text-white py-3 px-4">
        <div className="text-3xl font-bold">
          {localdate ? localdate : "Loading..."}
        </div>
        <div className="text-3xl font-bold">
          {localtime ? localtime : "Loading..."}
        </div>
      </div>
      <div className="bg-[#101744] text-white flex justify-between py-3 px-4">
        <div className="flex flex-col items-center align-middle">
          <div>
            {CWeatherIcon ? (
              <img src={CWeatherIcon} alt="Weather icon" className="size-20" />
            ) : (
              "Loading..."
            )}
          </div>
          <div className="text-md text-balance whitespace-nowrap text-justify">{CWeather ? CWeather : "Loading..."}</div>
        </div>
        <div className="border-l border-gray-400 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-semibold">
            {temp ? `${temp}°C` : "Loading..."}
          </div>
          <div className="text-md text-balance flex flex-row items-center mt-4">
            <svg
              className="mr-2"
              width="20"
              height="37"
              viewBox="0 0 20 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8006 23.8684V12.9181C11.8006 12.4897 11.6305 12.0789 11.3276 11.7761C11.0247 11.4732 10.6139 11.303 10.1856 11.303C9.75721 11.303 9.3464 11.4732 9.04352 11.7761C8.74063 12.0789 8.57047 12.4897 8.57047 12.9181V23.8684C8.08226 24.1502 7.67632 24.5549 7.39299 25.0423C7.10965 25.5296 6.95878 26.0826 6.95538 26.6463C6.95538 27.503 7.2957 28.3246 7.90148 28.9304C8.50725 29.5362 9.32886 29.8765 10.1856 29.8765C11.0423 29.8765 11.8639 29.5362 12.4696 28.9304C13.0754 28.3246 13.4157 27.503 13.4157 26.6463C13.4123 26.0826 13.2615 25.5296 12.9781 25.0423C12.6948 24.5549 12.2888 24.1502 11.8006 23.8684ZM17.4535 20.186V8.07283C17.4535 6.14526 16.6877 4.29664 15.3247 2.93365C13.9617 1.57065 12.1131 0.804932 10.1856 0.804932C8.25799 0.804932 6.40937 1.57065 5.04638 2.93365C3.68338 4.29664 2.91766 6.14526 2.91766 8.07283V20.186C1.80138 21.4509 1.03467 22.9854 0.69338 24.6375C0.352087 26.2897 0.448033 28.0024 0.971728 29.6061C1.49542 31.2098 2.42872 32.649 3.6793 33.7813C4.92988 34.9137 6.45441 35.6999 8.10209 36.0623C8.78655 36.2183 9.48405 36.3102 10.1856 36.3369C12.0601 36.3456 13.8969 35.8105 15.4734 34.7963C17.0499 33.7822 18.2984 32.3325 19.0677 30.6231C19.8369 28.9137 20.0938 27.0178 19.8073 25.1653C19.5208 23.3128 18.7032 21.5832 17.4535 20.186ZM14.2233 31.6047C12.9382 32.7441 11.2532 33.3263 9.53885 33.2233C7.8245 33.1204 6.22128 32.3406 5.08188 31.0555C3.94247 29.7705 3.36021 28.0854 3.4632 26.3711C3.56618 24.6568 4.34596 23.0535 5.63101 21.9141C5.78361 21.7646 5.90502 21.5862 5.98819 21.3893C6.07136 21.1925 6.11465 20.9811 6.11553 20.7674V8.07283C6.11553 7.00196 6.54093 5.97495 7.29815 5.21773C8.05537 4.46051 9.08238 4.03511 10.1533 4.03511C11.2241 4.03511 12.2511 4.46051 13.0084 5.21773C13.7656 5.97495 14.191 7.00196 14.191 8.07283V20.8966C14.1919 21.1103 14.2351 21.3217 14.3183 21.5185C14.4015 21.7154 14.5229 21.8938 14.6755 22.0433C15.3357 22.6811 15.8524 23.4522 16.1911 24.3053C16.5299 25.1584 16.683 26.0739 16.6402 26.9908C16.5974 27.9078 16.3597 28.805 15.943 29.6229C15.5262 30.4407 14.94 31.1604 14.2233 31.7339V31.6047Z"
                fill="white"
              />
            </svg>
            {press ? `${press} mbar Pressure` : "Loading..."}
          </div>
        </div>
        <div className="border-l border-gray-400 mx-2"></div>
        <div className="flex flex-col justify-start">
          <div className="flex flex-row items-center">
            <svg
              width="40"
              height="37"
              viewBox="0 0 48 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.08743 13.4654C1.6426 13.4654 1.216 13.2887 0.901461 12.9742C0.586923 12.6596 0.410217 12.233 0.410217 11.7882C0.410217 11.3434 0.586923 10.9168 0.901461 10.6022C1.216 10.2877 1.6426 10.111 2.08743 10.111H22.214C22.8263 10.1105 23.4268 9.94247 23.9505 9.62502C24.4741 9.30757 24.9008 8.85284 25.1844 8.31013C25.468 7.76742 25.5977 7.15743 25.5593 6.5463C25.5209 5.93516 25.3159 5.34619 24.9667 4.84323C24.6174 4.34027 24.1371 3.94251 23.5779 3.69308C23.0186 3.44364 22.4018 3.35204 21.7942 3.42821C21.1866 3.50437 20.6115 3.7454 20.1311 4.12516C19.6508 4.50492 19.2835 5.00892 19.0692 5.58253C19.0024 5.80043 18.892 6.00244 18.7445 6.17623C18.5971 6.35002 18.4158 6.49194 18.2117 6.59332C18.0076 6.69471 17.785 6.75343 17.5574 6.76591C17.3299 6.7784 17.1021 6.74437 16.8882 6.66591C16.6742 6.58746 16.4785 6.46622 16.3129 6.3096C16.1474 6.15298 16.0155 5.96426 15.9253 5.75496C15.8351 5.54567 15.7885 5.32019 15.7883 5.09229C15.7882 4.86439 15.8345 4.63886 15.9244 4.42945C16.3497 3.2796 17.0819 2.26827 18.0415 1.50529C19.0011 0.742316 20.1514 0.256874 21.3675 0.101694C22.5836 -0.0534856 23.819 0.12753 24.9395 0.62508C26.0599 1.12263 27.0226 1.91769 27.723 2.9239C28.4234 3.93011 28.8347 5.10899 28.9122 6.3325C28.9897 7.55601 28.7304 8.77737 28.1626 9.8639C27.5947 10.9504 26.7401 11.8606 25.6913 12.4955C24.6426 13.1305 23.4399 13.4659 22.214 13.4654H2.08743ZM28.9228 23.5287H5.44185C4.99703 23.5287 4.57042 23.7054 4.25588 24.0199C3.94135 24.3345 3.76464 24.7611 3.76464 25.2059C3.76464 25.6507 3.94135 26.0773 4.25588 26.3919C4.57042 26.7064 4.99703 26.8831 5.44185 26.8831H28.9228C29.5352 26.8836 30.1357 27.0516 30.6593 27.3691C31.1829 27.6865 31.6097 28.1413 31.8933 28.684C32.1769 29.2267 32.3065 29.8367 32.2681 30.4478C32.2297 31.059 32.0248 31.6479 31.6755 32.1509C31.3262 32.6538 30.846 33.0516 30.2867 33.301C29.7275 33.5505 29.1106 33.6421 28.5031 33.5659C27.8955 33.4897 27.3203 33.2487 26.84 32.869C26.3596 32.4892 25.9924 31.9852 25.778 31.4116C25.7113 31.1937 25.6008 30.9917 25.4534 30.8179C25.306 30.6441 25.1247 30.5022 24.9205 30.4008C24.7164 30.2994 24.4938 30.2407 24.2663 30.2282C24.0387 30.2157 23.811 30.2497 23.597 30.3282C23.383 30.4067 23.1873 30.5279 23.0218 30.6845C22.8562 30.8411 22.7243 31.0299 22.6341 31.2391C22.5439 31.4484 22.4973 31.6739 22.4972 31.9018C22.497 32.1297 22.5433 32.3553 22.6333 32.5647C23.0585 33.7145 23.7907 34.7258 24.7503 35.4888C25.7099 36.2518 26.8603 36.7372 28.0764 36.8924C29.2925 37.0476 30.5279 36.8666 31.6483 36.369C32.7688 35.8715 33.7315 35.0764 34.4319 34.0702C35.1322 33.064 35.5435 31.8851 35.621 30.6616C35.6985 29.4381 35.4393 28.2167 34.8714 27.1302C34.3036 26.0437 33.4489 25.1335 32.4002 24.4986C31.3514 23.8636 30.1488 23.5282 28.9228 23.5287ZM40.6633 6.75658C39.2936 6.76011 37.9576 7.1815 36.8337 7.96446C35.7099 8.74741 34.8517 9.85466 34.3737 11.1383C34.2838 11.3477 34.2375 11.5732 34.2377 11.8011C34.2378 12.029 34.2844 12.2545 34.3746 12.4638C34.4648 12.6731 34.5967 12.8618 34.7622 13.0184C34.9278 13.1751 35.1235 13.2963 35.3375 13.3748C35.5515 13.4532 35.7792 13.4872 36.0067 13.4748C36.2343 13.4623 36.4569 13.4036 36.661 13.3022C36.8651 13.2008 37.0464 13.0589 37.1939 12.8851C37.3413 12.7113 37.4518 12.5093 37.5185 12.2914C37.7328 11.7178 38.1001 11.2138 38.5804 10.834C39.0608 10.4542 39.636 10.2132 40.2435 10.1371C40.8511 10.0609 41.468 10.1525 42.0272 10.4019C42.5864 10.6514 43.0667 11.0491 43.416 11.5521C43.7653 12.055 43.9702 12.644 44.0086 13.2551C44.047 13.8663 43.9174 14.4763 43.6338 15.019C43.3502 15.5617 42.9234 16.0164 42.3998 16.3339C41.8762 16.6513 41.2756 16.8194 40.6633 16.8198H3.76464C3.31982 16.8198 2.89321 16.9965 2.57867 17.3111C2.26413 17.6256 2.08743 18.0522 2.08743 18.4971C2.08743 18.9419 2.26413 19.3685 2.57867 19.683C2.89321 19.9976 3.31982 20.1743 3.76464 20.1743H40.6633C42.4426 20.1743 44.149 19.4674 45.4072 18.2093C46.6653 16.9511 47.3721 15.2447 47.3721 13.4654C47.3721 11.6861 46.6653 9.9797 45.4072 8.72155C44.149 7.4634 42.4426 6.75658 40.6633 6.75658Z"
                fill="white"
              />
            </svg>
            <div className="text-md text-balance whitespace-nowrap text-justify ml-3">
              {wind ? `${wind} km/h Wind` : "Loading..."}
            </div>
          </div>
          <div className="flex flex-row mt-8">
            <svg
             className="size-7"
              width="26"
              height="38"
              viewBox="0 0 26 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8412 19.7163C22.1285 10.7951 14.1447 1.27383 13.7388 0.792783C13.6754 0.72338 13.5983 0.667949 13.5123 0.630023C13.4263 0.592097 13.3333 0.57251 13.2393 0.57251C13.1453 0.57251 13.0524 0.592097 12.9664 0.630023C12.8804 0.667949 12.8032 0.72338 12.7398 0.792783C12.3339 1.27383 4.34879 10.7937 1.63469 19.7163C1.07848 21.5462 0.725891 23.3543 0.725891 25.0502C0.725891 31.9489 6.33995 37.5616 13.2386 37.5616C20.1373 37.5616 25.7486 31.9489 25.7486 25.0502C25.75 23.3543 25.3974 21.5476 24.8412 19.7163ZM13.24 36.2551C7.06153 36.2551 2.03511 31.2287 2.03511 25.0516C2.03511 23.3748 2.4082 21.5626 3.00404 19.7177C5.37786 12.3721 11.4538 4.47172 13.24 2.25096C15.0262 4.47172 21.1021 12.3721 23.4732 19.7177C24.0691 21.564 24.4422 23.3748 24.4422 25.0516C24.4422 31.2287 19.4171 36.2551 13.24 36.2551Z"
                fill="white"
              />
              <path
                d="M6.22655 19.7166C5.54324 21.4522 5.08679 23.1905 5.08679 24.773C5.08679 26.9352 5.94572 29.0089 7.47462 30.5378C9.00352 32.0667 11.0772 32.9256 13.2393 32.9256C15.4015 32.9256 17.4752 32.0667 19.0041 30.5378C20.533 29.0089 21.3919 26.9352 21.3919 24.773C21.3919 23.1905 20.9354 21.4522 20.2521 19.7166H6.22655Z"
                fill="white"
              />
            </svg>
            <div className="text-md text-balance whitespace-nowrap text-justify ml-3">
              {humid ? `${humid}% Humidity` : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

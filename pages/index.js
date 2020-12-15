import gta from "google-trends-api";
import { useState } from "react";

export const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "keyword":
        setKeyword(event.target.value);
        break;
      case "start-date":
        setStartDate(event.target.value);
        break;
      case "end-date":
        setEndDate(event.target.value);
        break;
      default:
        console.log("key not found");
    }
  };

  const search = async () => {
    const params = {
      keyword: keyword,
      geo: "JP",
      hl: "ja",
      startTime: new Date(startDate),
      endTime: new Date(endDate),
    };

    const ret = await gta.interestOverTime(params);
    console.log(ret);
  };

  return (
    <div className="container">
      <main>
        <h1>Welcome to Google Trends Firebase App</h1>

        <div className="jumbotron mt-3">
          <div className="form-group">
            <label>Keyword</label>
            <input
              type="text"
              className="form-control"
              placeholder="keyword"
              name="keyword"
              value={keyword}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="start date"
              name="start-date"
              value={startDate}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="end date"
              name="end-date"
              value={endDate}
              onChange={handleChange}
            ></input>
          </div>
          <button type="button" className="btn btn-primary" onClick={search}>
            Search
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

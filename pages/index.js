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
    if (!keyword || !startDate || !endDate) {
      alert("全ての項目を入力してください");
      return;
    }

    const params = {
      keyword: keyword,
      geo: "JP",
      hl: "ja",
      startTime: startDate,
      endTime: endDate,
    };

    const query_params = new URLSearchParams(params);
    window.open(`/api/gta?${query_params}`, "_self");
  };

  return (
    <div className="container">
      <main>
        <h1>Google Trends Downloader</h1>

        <div className="jumbotron mt-3">
          <div className="form-group">
            <label>Keyword</label>
            <textarea
              className="form-control"
              placeholder="keyword"
              name="keyword"
              value={keyword}
              onChange={handleChange}
              rows="10"
              required
            ></textarea>
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
              required
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
              required
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={search}
          >
            Search
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

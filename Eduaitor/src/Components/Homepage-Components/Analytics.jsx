import analyticsImage from "../../assets/analytics-image.jpg";

const Analytics = () => {
  return (
    <div className="erp-wrapper">
      <div className="erp-left">
        <h3>Drive excellence through actionable insights</h3>
        <p>
          Gain valuable insights that inform strategy, optimize processes,
          and fuel educational excellence.
        </p>
        <button className="view-btn">View Details</button>
      </div>

      <div className="erp-right">
        <div className="erp-img-wrap">
    <img src={analyticsImage} alt="Analytics Dashboard" />
  </div>
      </div>
    </div>
  );
};

export default Analytics;

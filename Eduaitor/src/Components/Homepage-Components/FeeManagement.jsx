import feeManagement from "../../assets/fee-management-image.jpg";

const FeeManagement = () => {
  return (
    <div className="erp-wrapper">
      <div className="erp-left">
        <h3>Simplify fee operations, strengthen financial outcomes</h3>
        <p>
          Efficiently manage your institution's finances with online fee
          collection, automation, and real-time reporting.
        </p>
        <button className="view-btn">View Details</button>
      </div>

      <div className="erp-right">
         <div className="erp-img-wrap">
    <img src={feeManagement} alt="Fee Management" />
  </div>
      </div>
    </div>
  );
};

export default FeeManagement;

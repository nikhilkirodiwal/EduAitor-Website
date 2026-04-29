import studentImage from "../../assets/student-info-image.avif";
const StudentInfo = () => {

  return (
    <div className="erp-wrapper">
      <div className="erp-left">
        <h3>Keep all student data at your fingertips</h3>
        <p>
          Effortlessly collect, track, and access all essential student
          information from one place. Tap into valuable insights to make
          informed decisions and boost student success.
        </p>
        <button className="view-btn">View Details</button>
      </div>

      <div className="erp-right">
<div className="erp-img-wrap">
    <img src={studentImage} alt="Student Information" />
  </div>

      </div>
    </div>
  );
};

export default StudentInfo;

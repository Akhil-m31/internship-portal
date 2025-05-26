import PropTypes from 'prop-types';

const ResumeModal = ({ imageUrl, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target.className === "resume-modal") {
      onClose();
    }
  };

  return (
    <div
      className="resume-modal"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        zIndex: 9999,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        className="modal-content"
        style={{
          position: "relative",
          background: "transparent",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          padding: 0,
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span
          className="close"
          onClick={onClose}
          style={{
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "20px",
            zIndex: 2
          }}
        >
          &times;
        </span>
        <img
          src={imageUrl}
          alt="resume"
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            borderRadius: "12px",
            background: "#fff",
            display: "block",
            margin: "0 auto"
          }}
        />
      </div>
    </div>
  );
};

ResumeModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResumeModal;
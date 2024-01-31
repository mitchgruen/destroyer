import '../styles/ForgotPasswordStyle.css';

export default function ForgotPassword() {
  return (
    <div className="forgot">
      <div className="forgot-container">
        <div className="forgot-header">Destroyer</div>
        <div className="forgot-subheader">Reset Your Password</div>
        <div className="forgot-email">
          <input type="text" placeholder="Username" />
        </div>
        <div className="forgot-button">
          <button>Reset Password</button>
        </div>
      </div>
    </div>
  );
}

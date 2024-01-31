import '../styles/RegisterStyle.css';

export default function Register() {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-header">Destroyer</div>
        <div className="register-subheader">Create Your Account</div>
        <div className="register-username">
          <input type="text" placeholder="Username" />
        </div>
        <div className="register-password">
          <input type="password" placeholder="Password" />
        </div>
        <div className="confirm-password">
          <input type="password" placeholder="Password" />
        </div>
        <div className="register-phone-number">
          <input type="text" placeholder="Phone" />
        </div>
        <div className="register-create-account">
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}


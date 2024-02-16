import '../styles/AuthStyle.css';
import { ReactComponent as DestroyerLogo } from '../assets/logo/destroyertext.svg';

export default function AuthWrapper({ children }) {
  return (
    <div className="auth">
      <div className="auth-container">
        <div>
          <DestroyerLogo className="auth-logo" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

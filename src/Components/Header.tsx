import logo from '../assets/logo.svg'
import '../assets/css/Header.css'

export const Header = (): JSX.Element => {
	return (
		<>
			<header>
				<div className="sp-menu-btn"></div>
				<div className='header-page-links'>
					<a href="/" className='home-logo-link'>
						<img src={logo} className='logo-img' alt="Shortly" width='121' height='33' />
					</a>
					<a href="#" className='features-link'>Features</a>
					<a href="#" className='pricing-link'>Pricing</a>
					<a href="#" className='resources-link'>Resources</a>
				</div>
				<div className="header-login-menu">
					<a href="#" className='login-link'>Login</a>
					<a href="#" className='sign-up-link'>Sign Up</a>
				</div>
			</header>
		</>
	);
}
import '../assets/css/Mv.css'
import topMvImg from '../assets/mv_img.svg'

export const Mv = ():JSX.Element => {
	return(
		<div className="top-mv">
      <div className="top-mv-txt">
        <h1 className='main-ttl'>
          More than just<br />
          shorter links
        </h1>
        <p className='sub-ttl'>
          Build your brand's recognition and get detailed<br />
          insights on how your links are performing.
        </p>
        <button className="started-btn">
          Get Started
        </button>
      </div>
      <img src={topMvImg} alt="More than just shorter links" className="top-mv-img" />
    </div>
	)
}
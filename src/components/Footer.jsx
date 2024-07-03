import './footer.css'
const Footer  = ()=>{
    return(
        
  <footer className="footer">
  {/* <div className="waves">
    <div className="wave" id="wave1"></div>
    <div className="wave" id="wave2"></div>
    <div className="wave" id="wave3"></div>
    <div className="wave" id="wave4"></div>
  </div> */}
  <ul className="menu">
    <li className="menu__item"><a className="menu__link" href="#" target='_top'>Home</a></li>
    <li className="menu__item"><a className="menu__link" href="#"arget='_top'>About</a></li>
    <li className="menu__item"><a className="menu__link" href="#"arget='_top'>Contact</a></li>

  </ul>
  <p>&copy;2021 Hassan Hamdi | All Rights Reserved</p>
  
</footer>
    )
}

export default Footer;
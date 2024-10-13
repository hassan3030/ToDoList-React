import { Link } from 'react-router-dom';
import './noFound.css'
const NotFound = () => {  
    return (
      <section className="py-5">
		<div className="d-flex justify-content-center 
					align-items-center flex-column 
					text-center w-100">
			<div className="bg_img w-50">
			</div>
			<div>
				<p className="display-4">Looks Like You're Lost</p>
				<p>The page you are looking for not available...</p>
				<Link to={''}>Go to Home</Link>
				<a href="@/"
				   className="text-black text-decoration-none px-4 py-3 g-success d-inline-block mt-2 rounded">
					Go to Home
				</a>
			</div>
		</div>
	</section>
          
    );
  };
  
  export default NotFound;


 
		
	

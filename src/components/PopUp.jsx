import { useState , useEffect} from 'react';
import './popUp.css'

const PopUp  = ()=>{
    const [apearance , sepApearance]=useState(false);
    const close =()=>{
        const changeVal = !apearance;
        sepApearance(changeVal)
    }
    useEffect(()=>{
   close();
    })
    
    return(
        <div>
             {/* className={apearance?' modal' : 'modal2'} */}
    <div className={apearance ? 'modal':'modal2'}>
        <div className="modal" tabindex="">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Error</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Add Task Item</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={close}>Close</button>
        <button type="button" className="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
        </div>
     
     )
}

export default PopUp;

<div className='outer-model'>
        <div class="modal" tabindex="">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Error</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Add Task Item</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
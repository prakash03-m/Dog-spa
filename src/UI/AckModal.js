import React, { Fragment } from 'react';
import './AckModal.css';

const AckModal = props => {
    return (
        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    <div className="modal-body">
                        <p>{props.message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.onConfirm}>Close</button>
                    </div>
                </div>
            </div>
        </div>

        // <div>
        //     <div onClick={closeModalHandler} className='backdrop'>
        //         <div className='modal'>
        //             <header className='header'>
        //                 <h2>{props.title}</h2>
        //             </header>
        //             <div className='content'>
        //                 <p>{props.message}</p>
        //             </div>
        //             <footer className='actions'>
        //                 <button type='button' onClick={props.onConfirm}>Okay</button>
        //             </footer>
        //         </div>
        //     </div>
        // </div>

        // <div class="container">
        //     <h2>Modal Example</h2>
        //     <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
        //     <div class="modal fade" id="myModal" role="dialog">
        //         <div class="modal-dialog">
        //             <div class="modal-content">
        //                 <div class="modal-header">
        //                     <button type="button" class="close" data-dismiss="modal">&times;</button>
        //                     <h4 class="modal-title">Modal Header</h4>
        //                 </div>
        //                 <div class="modal-body">
        //                     <p>Some text in the modal.</p>
        //                 </div>
        //                 <div class="modal-footer">
        //                     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default AckModal;
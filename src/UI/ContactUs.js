import React from 'react';
import './ContactUs.css';

const ContactUs = props => {
    return (
        <div className="scroll-page container" id="contact">
            <div className="row">
                <section className="col-sm-4">
                    <h4>Main branch</h4>
                    <p>1022/Test street</p>
                    <p>Test city</p>
                    <p>9999900000</p>
                </section>
                <section className="col-sm-4">
                    <h4>Sub branch I</h4>
                    <p>1022/Test street</p>
                    <p>Test city</p>
                    <p>9999900000</p>
                </section>
                <section className="col-sm-4">
                    <h4>Sub branch II</h4>
                    <p>1022/Test street</p>
                    <p>Test city</p>
                    <p>9999900000</p>
                </section>
            </div>
        </div>
    )
}

export default ContactUs;
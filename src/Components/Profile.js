import { useEffect, useState, useRef } from 'react';
import AuthService from '../Services/auth.service'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


function Profile() {

    const [customer, setCustomer] = useState([]);
    const user = AuthService.getCurrentUser();
    useEffect(() => {
        fetch("http://ec2-44-203-2-236.compute-1.amazonaws.com:8080/api/auth/customer/" + user.cust_Id)
            .then(res => res.json())
            .then((result) => { setCustomer(result); }
            );

    }, []);
    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch("http://ec2-44-203-2-236.compute-1.amazonaws.com:8080/package/")
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [booking, setBooking] = useState([]);
    useEffect(() => {
        fetch("http://ec2-44-203-2-236.compute-1.amazonaws.com:8080/alltours/" + user.cust_Id)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );

    }, []);

    const res = pack.filter(el => {
        return booking.find(element => {
            return element.packageid === el.packageid;
        });
    });
 
 

    return (

        <div className="container">

            <div className="row">
                <div className="col-12 mt-3">
                    <h2 className="text-warning">Your Information</h2>
                    {customer.map(cust => (<>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFristName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="FirstName" value={cust.firstname} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="LastName" value={cust.lastname} disabled />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="Email" name="Email" value={cust.email} disabled />
                            </Form.Group>
                        </Row>
                    </>))}
                </div>
                <hr></hr>
                <div className="row">
                    <h2 className="text-warning">Your Bookings</h2>
                    <div className="col-12 mt-1">
                        <div id="Cost">
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Package Name</th>
                                        <th scope="col">Number of Passanger</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Total Cost</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {booking.map((book, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{book.bookingid}</td>
                                                {res.filter((tor) => tor.packageid === book.packageid ).map((pkg) => (
                                                    <td>{pkg.packagename}</td>
                                                ))}
                                                <td>{book.totalpassanger}</td>
                                                <td>{book.bookingdate}</td>
                                                <td>₹{book.totalfinalcost}</td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
} export default Profile;

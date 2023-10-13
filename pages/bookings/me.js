import Link from 'next/link';
import Loader from '../../components/layout/Loader';

import useSWR, { mutate } from "swr";
import { Table } from "react-bootstrap"

// import easyinvoice from 'easyinvoice'

const MyBookings = () => {

  const { data: myBookings, error, isLoading } = useSWR(`/api/bookings/me`,
    (url) => fetch(url).then((res) => res.json()));

  function addOneDay(dateStr) {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1);
    return date;
  }

  // const downloadInvoice = async (booking) => {


  //   var data = {
  //     // Customize enables you to provide your own templates
  //     // Please review the documentation for instructions and examples
  //     "customize": {
  //       //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
  //     },
  //     "images": {
  //       // The logo on top of your invoice
  //       "logo": "https://res.cloudinary.com/realestate-veli/image/upload/v1684768637/realestate/logo/Sierrah_Scarpine_Logo_awiyaq.png",
  //       // The invoice background
  //       "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
  //     },
  //     // Your own data
  //     "sender": {
  //       "company": "Real Estate",
  //       "address": "13th Street. 47 W 13th St",
  //       "zip": "10001",
  //       "city": "New York",
  //       "country": "United States"
  //     },
  //     // Your recipient
  //     "client": {
  //       "company": `${booking.user.name}`,
  //       "address": `${booking.user.email}`,
  //       "zip": "",
  //       "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
  //       "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
  //     },
  //     "information": {
  //       // Invoice number
  //       "number": `${booking._id}`,
  //       // Invoice data
  //       "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
  //       // Invoice due date
  //       "due-date": `${new Date(Date.now()).toLocaleString('en-US')}`
  //     },
  //     // The products you would like to see on your invoice
  //     // Total values are being calculated automatically
  //     "products": [
  //       {
  //         "quantity": `${booking.daysOfStay}`,
  //         "description": `${booking.place.name}`,
  //         "tax": 0,
  //         "price": booking.place.pricePerNight
  //       },
  //     ],
  //     // The message you would like to display on the bottom of your invoice
  //     "bottom-notice": "This is auto generated Invoice of your booking on Real Estate.",
  //     // Settings to customize your invoice
  //     "settings": {
  //       "currency": "USD",
  //     },
  //     // Translate your invoice to your preferred language
  //     "translate": {
  //     },
  //   };

  //   const result = await easyinvoice.createInvoice(data);
  //   easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

  // }

  return (
    <div className='container container-fluid'>
      {
        isLoading ?
          <Loader />
          :
          <>
            <h1 className='my-5'>My Bookings</h1>
            {myBookings && myBookings.bookings.length !== 0 ?
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th >Booking ID</th>
                    <th >Check In</th>
                    <th >Check Out</th>
                    <th >Amount Paid</th>
                    <th >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myBookings.bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{booking._id}</td>
                      <td>{new Date(booking.checkInDate).toLocaleString('en-US')}</td>
                      <td>{addOneDay(booking.checkOutDate).toLocaleString('en-US')}</td>
                      <td>${booking.amountPaid}</td>
                      <td className="d-flex">
                        <Link className="btn btn-primary" href={`/bookings/${booking._id}`}>
                          <i className="fa fa-eye"></i>
                        </Link>
                        {/* <button className="btn btn-success mx-2" onClick={() => downloadInvoice(booking)}>
                          <i className="fa fa-download"></i>
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table> :
              <div className="text-center fs-1"> No Bookings</div>
            }
          </>
      }
    </div>
  )
}

export default MyBookings
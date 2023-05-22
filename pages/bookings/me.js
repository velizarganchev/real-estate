import { useGetAllMyBookingsQuery } from "../../redux/bookingApiSlice"

import Link from "next/link"
import { Table } from "react-bootstrap"

import { MDBDataTable } from 'mdbreact'
import easyinvoice from 'easyinvoice'

const MyBookings = () => {

  const { data: myBookings, error, isError, isLoading } = useGetAllMyBookingsQuery();

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: 'Booking ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Check In',
          field: 'checkIn',
          sort: 'asc'
        },
        {
          label: 'Check Out',
          field: 'checkOut',
          sort: 'asc'
        },
        {
          label: 'Amount Paid',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }

      ],
      rows: []
    }
    if (myBookings) {

      myBookings.bookings && myBookings.bookings.forEach(booking => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
          checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
          amount: `$${booking.amountPaid}`,
          actions:
            <>
              <Link className="btn btn-primary" href={`/bookings/${booking._id}`}>
                <i className="fa fa-eye"></i>
              </Link>
              <button className="btn btn-success mx-2" onClick={() => downloadInvoice(booking)}>
                <i className="fa fa-download"></i>
              </button>

            </>
        })
      })

      return data;

    }
  }

  const downloadInvoice = async (booking) => {


    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
      },
      "images": {
        // The logo on top of your invoice
        "logo": "https://res.cloudinary.com/realestate-veli/image/upload/v1684768637/realestate/logo/Sierrah_Scarpine_Logo_awiyaq.png",
        // The invoice background
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
      },
      // Your own data
      "sender": {
        "company": "Real Estate",
        "address": "13th Street. 47 W 13th St",
        "zip": "10001",
        "city": "New York",
        "country": "United States"
      },
      // Your recipient
      "client": {
        "company": `${booking.user.name}`,
        "address": `${booking.user.email}`,
        // "zip": "",
        "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
        "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
      },
      "information": {
        // Invoice number
        "number": `${booking._id}`,
        // Invoice data
        "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
        // Invoice due date
        "due-date": `${new Date(Date.now()).toLocaleString('en-US')}`
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      "products": [
        {
          "quantity": `${booking.daysOfStay}`,
          "description": `${booking.place.name}`,
          "tax": 0,
          "price": booking.place.pricePerNight
        },
      ],
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "This is auto generated Invoice of your booking on Real Estate.",
      // Settings to customize your invoice
      "settings": {
        "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
      },
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

  }

  return (
    <div className='container container-fluid'>
      <h1 className='my-5'>My Bookings</h1>
      {myBookings &&
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
                <td>{new Date(booking.checkOutDate).toLocaleString('en-US')}</td>
                <td>${booking.amountPaid}</td>
                <td>
                  <Link className="btn btn-primary" href={`/bookings/${booking._id}`}>
                    <i className="fa fa-eye"></i>
                  </Link>
                  <button className="btn btn-success mx-2" onClick={() => downloadInvoice(booking)}>
                    <i className="fa fa-download"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </div>
  )
}

export default MyBookings
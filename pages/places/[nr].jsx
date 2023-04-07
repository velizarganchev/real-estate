import { Table, Spinner, Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function Place() {
    const router = useRouter();
    const { nr } = router.query;
    return (
        <div>
            <h1>Bookingstatus</h1>
            <div className="row mt-4">
                <div className="col-9">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Booking Nr.</th>
                                <th>Client</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{nr}</td>
                                <td>Guybrush</td>
                                <td>Monkey Island</td>
                                <td>
                                    <span>Zubereitung </span>
                                    <Spinner animation='border' variant='success' size='sm' />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 p-2">
                    <div className='shadow'>
                        <Card>
                            <Card.Header as="h5">Total</Card.Header>
                            <Card.Body className='text-center'>
                                <Card.Title>
                                    6,95 $
                                </Card.Title>
                                <Button variant='success disabled'>payed</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

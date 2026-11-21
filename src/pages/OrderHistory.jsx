import { useEffect, useState } from "react";
import { getOrderHistory } from "../services/OrderServices";
import { startRazorpayPayment } from "../services/PaymentServices";

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [payingOrderId, setPayingOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const data = await getOrderHistory();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePayNow = async (orderId) => {

        try {
            setPayingOrderId(orderId);

            const result = await startRazorpayPayment(orderId);

            alert(result.message || "Payment verified successfully!");

            await fetchOrders();

        } catch (err) {
            alert(err.message || "Payment could not be completed.");
        } finally {
            setPayingOrderId(null);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading orders...</h4>;
    }

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    return (
        <div className="container mt-4 mb-5">

            <h2 className="mb-4">📦 My Order History</h2>

            {orders.length === 0 ? (

                <div className="alert alert-info">
                    You haven't placed any orders yet.
                </div>

            ) : (

                orders.map((order) => (

                    <div className="card mb-4 shadow-sm" key={order.orderId}>

                        <div className="card-header d-flex justify-content-between flex-wrap">

                            <div>
                                <strong>Order #{order.orderId}</strong>
                                <br />
                                <small>
                                    {new Date(order.orderDate).toLocaleString()}
                                </small>
                            </div>

                            <div>
                                <span className={`badge me-2 ${
                                    order.orderStatus === "CONFIRMED"
                                        ? "bg-success"
                                        : "bg-warning text-dark"
                                }`}>
                                    {order.orderStatus}
                                </span>

                                <span className={`badge ${
                                    order.paymentStatus === "SUCCESS"
                                        ? "bg-success"
                                        : "bg-secondary"
                                }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>

                        </div>

                        <div className="card-body">

                            {order.items.map((item) => (

                                <div
                                    className="row align-items-center border-bottom py-3"
                                    key={item.bikeId}
                                >

                                    <div className="col-md-2">
                                        <img
                                            src={item.image}
                                            alt={item.bikeName}
                                            className="img-fluid"
                                            style={{
                                                height: "90px",
                                                width: "120px",
                                                objectFit: "contain"
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <h6>{item.bikeName}</h6>
                                        <p className="text-muted mb-0">
                                            {item.brand}
                                        </p>
                                    </div>

                                    <div className="col-md-2">
                                        Quantity: {item.quantity}
                                    </div>

                                    <div className="col-md-2">
                                        ₹{Number(item.price).toLocaleString("en-IN")}
                                    </div>

                                    <div className="col-md-2 fw-bold">
                                        ₹{Number(item.subtotal).toLocaleString("en-IN")}
                                    </div>

                                </div>

                            ))}

                            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">

                                <div>
                                    {order.paymentStatus === "PENDING" && (

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePayNow(order.orderId)}
                                            disabled={payingOrderId !== null}
                                        >
                                            {payingOrderId === order.orderId
                                                ? "Processing..."
                                                : "💳 Pay Now"}
                                        </button>

                                    )}
                                </div>

                                <h5>
                                    Total: ₹
                                    {Number(order.totalAmount).toLocaleString("en-IN")}
                                </h5>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default OrderHistory;
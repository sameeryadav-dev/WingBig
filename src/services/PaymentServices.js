const API = "http://localhost:8080/api/payments";

// Create Razorpay Order
export const createPaymentOrder = async (orderId) => {
    const response = await fetch(
        `${API}/create-order/${orderId}`,
        {
            method: "POST",
            credentials: "include"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create payment order");
    }

    return response.json();
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentResponse) => {
    const response = await fetch(
        `${API}/verify`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature
            })
        }
    );

    if (!response.ok) {
        throw new Error("Payment verification failed");
    }

    return response.json();
};

// Load Razorpay Checkout Script
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};


// Start Razorpay Payment
export const startRazorpayPayment = async (orderId) => {

    const loaded = await loadRazorpayScript();

    if (!loaded) {
        throw new Error("Razorpay SDK failed to load");
    }

    const data = await createPaymentOrder(orderId);

    return new Promise((resolve, reject) => {

        const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency,
            name: "WingBig Bike Showroom",
            description: `Payment for Order #${orderId}`,
            order_id: data.razorpayOrderId,

            handler: async function (response) {
                try {
                    const result = await verifyPayment(response);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            },

            modal: {
                ondismiss: () => {
                    reject(new Error("Payment window closed"));
                }
            },

            theme: {
                color: "#0d6efd"
            }
        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
            reject(new Error(
                response.error.description || "Payment failed"
            ));
        });

        razorpay.open();
    });
};
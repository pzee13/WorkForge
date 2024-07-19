import { useState, useEffect } from 'react';
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import { RootState } from "../../../app/store";
import { useSelector } from 'react-redux';
import { usePreBookingsMutation, usePaymentMutation } from '../../../slices/userApiSlice';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { MyError } from '../../../utils/validations/commonVaild'

const PublicStripeKey: string = process.env.STRIPE_PUBLIC_KEY as string;


console.log("pub", PublicStripeKey);

if (import.meta.env) {
    console.log(import.meta.env);
} else {
    console.log("import.meta.env is not supported in this environment.");
}

export interface Booking {
    id?: string;
    spaceId: string;
    providerId: string;
    userId: string;
    bookingDate: Date;
    paidDate?: Date;
    moveInTime: string;
    moveOutTime: string;
    chargePerHour: number;
    noOfSpaces:number;
    totalPrice: number;
    totalPaid?: number;
    paymentId?: string;
    isPaid?: boolean;
}

export default function Checkout() {
    console.log("PublicStripeKey", PublicStripeKey);

    const booking = useSelector((state: RootState) => state.booking);

    console.log(booking);

    const [getPreBookings] = usePreBookingsMutation();
    const [bookingId, setBookingId] = useState(null);
    const [preBook, setPreBook] = useState<Booking | null>(null);
    // const [error, setError] = useState(null);
    const [payment] = usePaymentMutation();

    const handleGetPreBookings = async () => {
        try {
            console.log("hai");
            const result = await getPreBookings({
                spaceId: booking.spaceId,
                userId: booking.userId,
                providerId: booking.providerId,
                bookingDate: booking.bookingDate,
                moveInTime: booking.moveInTime,
                moveOutTime: booking.moveOutTime,
                noOfSpaces:booking.noOfSpaces,
                totalPrice: booking.totalPrice,
            }).unwrap();

            console.log("res", result);

            setBookingId(result.data._id);
            setPreBook(result.data); // Updated to use the response data
            // setError(null);
        } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    useEffect(() => {
        if (booking) {
            handleGetPreBookings();
        }
    }, [booking]);

    console.log("preeee",preBook)

    const handlePayment = async () => {
        const stripePromise: Stripe | null = await loadStripe(PublicStripeKey);

        if (!stripePromise) {
            console.error("Failed to initialize Stripe");
            return;
        }

        const amount = booking.totalPrice;
        if (isNaN(amount) || amount <= 0) {
            console.error("Invalid amount:", amount);
            return;
        }

        try {
            const res = await payment({
                amount,
                bookingId: bookingId as unknown as string,
                providerId: booking.providerId,
            }).unwrap();

            const session = res;

            await stripePromise.redirectToCheckout({
                sessionId: session.data,
            });
        } catch (error) {
            console.error("Payment error:", error);
        }
    };
    console.log(bookingId);
  
    // Fetch booking data from local storage on component moun
  
    return(
        <>
        <Navbar />

        <section className="py-6 mt-24 dark:bg-white dark:text-gray-900">
	<div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
		<div className="py-6 md:py-0 md:px-6">
			<h1 className="text-4xl font-bold">Checkout</h1>
			<p className="pt-2 pb-4">Please pay the amount to book the Space</p>
			<div className="space-y-4">
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
					</svg>
					<span>{booking.spaceName},{booking.areaName}, {booking.district} ,{booking.state}, {booking.country}</span>
				</p>
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
					</svg>
					<span>{booking.contactNumber}</span>
				</p>
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
					</svg>
					<span>contact@business.com</span>
				</p>
			</div>
		</div>
		<section className="py-20 dark:bg-gray-100 dark:text-gray-800">
	<div className="container px-4 mx-auto text-center">
		<div className="max-w-2xl mx-auto mb-16 text-center">
			<span className="font-bold tracking-wider uppercase dark:text-customGreen">Pricing</span>
			<h2 className="text-4xl font-bold lg:text-5xl">Confirm and Pay</h2>
		</div>
		<div >
				<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Total Price</h4>
						<span className="text-6xl font-bold">₹{booking.totalPrice}
							<span className="text-sm tracking-wide"></span>
						</span>
					</div>
					<p className="leading-relaxed dark:text-gray-600">Cancellation of booking will not be currently available</p>
					<ul className="space-y-2 dark:text-gray-600">
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-customGreen">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
							</svg>
							<span>Move In Time:<strong> {booking.moveInTime}:00</strong></span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-customGreen">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
							</svg>
                            <span>Move Out Time:<strong> {booking.moveOutTime}:00</strong></span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-customGreen">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
							</svg>
							<span className="text-md font-bold">Charge : ₹{booking.totalPrice}
							<span className="text-sm tracking-wide">/hour</span>
						</span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-customGreen">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
							</svg>
							<span>Booking Date:<strong> {new Date(booking.bookingDate).toLocaleDateString()}</strong></span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-customGreen">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
							</svg>
							<span>Vivamus ut lectus ex</span>
						</li>
					</ul>
					<button onClick={handlePayment}  className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-customGreen dark:text-gray-50">Pay Now</button>
				</div>
		
		</div>
	</div>
</section>
	</div>
</section>


        <Footer />
        </>
    )
}
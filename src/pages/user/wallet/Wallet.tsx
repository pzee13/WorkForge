import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Wallet = () => {

    const { userInfo } = useSelector((state: RootState) => state.auth);

    const walletAmount = userInfo?.wallet;

    return (
        <>
        <Navbar />
        <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="absolute inset-x-0  z-10 hidden lg:flex">
            <img
                className="hidden w-full lg:block"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png"
                alt=""
            />
            <img
                className="block w-full lg:hidden"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png"
                alt=""
            />
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-xl mx-auto text-center">
                <h1 className="text-4xl font-bold sm:text-6xl">
                    <span className="">
                        {walletAmount}
                    </span>
                </h1>
                <p className="mt-5 text-base text-black sm:text-xl">
                    No more hassle taking loans and making payments. Try Postcrats credit card, make your life simple.
                </p>

                <a
                    href="#"
                    title=""
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700"
                    role="button"
                >
                    Apply for free
                    <svg
                        className="w-6 h-6 ml-8 -mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </a>

                
            </div>
        </div>
    </section>
    <Footer />
    </>
    );
};

export default Wallet;
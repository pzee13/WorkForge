import Navbar from "../../../component/user/navbar/Navbar";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';
import homePageImage from '../../../assets/images/userLogin/homePage.jpg';
import image1 from "../../../assets/svgs/image.svg"

export function UserHome() {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const userId = userInfo?._id;

    console.log("prId", userId);
    return (
        <>
            <Navbar />
            <div className="flex justify-center dark:bg-gray-100">
                <div className="w-11/12">
                    <section className="dark:bg-gray-100">
                        <div className="bg-customGreen">
                            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
                                <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">Provident blanditiis cum exercitationem</h1>
                                <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
                                <div className="flex flex-wrap justify-center">
                                    <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">Get started</button>
                                    <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50">Learn more</button>
                                </div>
                            </div>
                        </div>

                        <img
                            src={homePageImage}
                            alt="Home Page"
                            className="w-4/6 mx-auto mb-12 -mt-20 dark:bg-gray-100 rounded-lg shadow-md lg:-mt-40"
                            style={{ height: '600px' }} // Custom height
                        />
                    </section>
                    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
                        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                            <img src="https://source.unsplash.com/random/480x360" alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
                            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
                                <div className="space-y-2">
                                    <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">The Best Activewear from the Nordstrom Anniversary Sale</a>
                                    <p className="text-xs dark:text-gray-600">By
                                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">Leroy Jenkins</a>
                                    </p>
                                </div>
                                <div className="dark:text-gray-800">
                                    <p>Insert the actual text content here...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="dark:bg-gray-100 dark:text-gray-800">
                        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                <h1 className="text-5xl font-bold leading-none sm:text-6xl">Ac mattis
                                    <span className="dark:text-green-600">senectus</span> erat pharetra
                                </h1>
                                <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                                    <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
                                </p>
                                <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                                    <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-green-600 dark:text-gray-50">Suspendisse</a>
                                    <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Malesuada</a>
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                                <img src={image1} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

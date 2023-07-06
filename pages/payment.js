import React from 'react'
import { MdOutlinePayment } from 'react-icons/Md';

const payment = () => {
    return (
        <>
            <style jsx>
                {`
                  
                  @media not print {
                    .form-radio::-ms-check {
                      border-width: 1px;
                      color: transparent;
                      background: inherit;
                      border-color: inherit;
                      border-radius: inherit;
                    }
                  }

                  
                  .form-select {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
                    -webkit-appearance: none;
                       -moz-appearance: none;
                            appearance: none;
                    -webkit-print-color-adjust: exact;
                            color-adjust: exact;
                    background-repeat: no-repeat;
                    padding-top: 0.5rem;
                    padding-right: 2.5rem;
                    padding-bottom: 0.5rem;
                    padding-left: 0.75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    background-position: right 0.5rem center;
                    background-size: 1.5em 1.5em;
                  }
                  
                  .form-select::-ms-expand {
                    color: #a0aec0;
                    border: none;
                  }

                  .hello {
                    max-width: 600px
                  }
                  
                  @media not print {
                    .form-select::-ms-expand {
                      display: none;
                    }
                  }
                  
                  @media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {
                    .form-select {
                      padding-right: 0.75rem;
                    }
                  }
            `}
            </style>

            <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 hello">
                    <div className="w-full pt-1 pb-5">
                        <div className="bg-[#007fff] text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <MdOutlinePayment className="mdi mdi-credit-card-outline text-3xl"/>
                        </div>
                    </div>
                    <div className="mb-10">
                        <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
                    </div>
                    <div className="mb-3 flex -mx-2">
                        <div className="px-2">
                            <label htmlFor="type1" className="flex items-center cursor-pointer">
                                <input type="radio" className="h-5 w-5 text-[#007fff]" name="type" id="type1" defaultChecked/>
                                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                            </label>
                        </div>
                        <div className="px-2">
                            <label htmlFor="type2" className="flex items-center cursor-pointer">
                                <input type="radio" className="h-5 w-5 text-[#007fff]" name="type" id="type2" />
                                <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" />
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#007fff] transition-colors" placeholder="John Smith" type="text" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#007fff] transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                        </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/2">
                            <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                            <div>
                                <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#007fff] transition-colors cursor-pointer">
                                    <option value="01">01 - January</option>
                                    <option value="02">02 - February</option>
                                    <option value="03">03 - March</option>
                                    <option value="04">04 - April</option>
                                    <option value="05">05 - May</option>
                                    <option value="06">06 - June</option>
                                    <option value="07">07 - July</option>
                                    <option value="08">08 - August</option>
                                    <option value="09">09 - September</option>
                                    <option value="10">10 - October</option>
                                    <option value="11">11 - November</option>
                                    <option value="12">12 - December</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#007fff] transition-colors cursor-pointer">
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-10">
                        <label className="font-bold text-sm mb-2 ml-1">Security code</label>
                        <div>
                            <input className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#007fff] transition-colors" placeholder="000" type="text" />
                        </div>
                    </div>
                    <div>
                        <button className="block w-full max-w-xs mx-auto bg-[#007fff] hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default payment
import { LuPlus, LuTrendingDown } from "react-icons/lu";

const ExpenseSettings = ({ onOpenModal, sources = [] }) => {
    const typeLabelMap = {
        Personal: "ব্যক্তিগত",
        Company: "প্রতিষ্ঠান",
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">ব্যয়ের উৎসসমূহ</h5>
                <button type="button" className="add-btn" onClick={onOpenModal}>
                    <LuPlus className="text-lg" />
                    ব্যয়ের ক্যাটাগরি যোগ করুন
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {
                    sources?.map((source) => (
                        <div key={source._id} className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 border border-gray-100'>
                            <div className="w-12 h-12 flex items-center justify-center text-xl px-3 py-1.5  bg-red-50 text-red-500 rounded-full ">

                                <LuTrendingDown />

                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-md text-gray-700 font-medium">{source.category}</p>
                                </div>
                                <div className="flex items-center gap-2">

                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md `}>

                                        <h6 className="text-xs font-medium">
                                        </h6>
                                        <span className=" p-1 text-gray-800 bg-gray-100 rounded-full inline-block px-2 ">{typeLabelMap[source.type] || source.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    );
};

export default ExpenseSettings;

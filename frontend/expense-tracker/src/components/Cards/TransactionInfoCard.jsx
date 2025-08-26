import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
}) => {
    const getAmountStyles = () =>
        type === "income" ? "bg-green-100 text-green-500" : "bg-red-50 text-red-500";

    const renderIcon = () => {
        if (!icon) return <LuUtensils />;

        // ✅ if it's a URL (http, https, or base64) → render <img>
        if (icon.startsWith("http") || icon.startsWith("data:")) {
            return <img src={icon} alt={title} className="w-6 h-6" />;
        }

        // ✅ otherwise assume it's an emoji string
        return <span className="text-2xl">{icon}</span>;
    };

    return (
        <div className="group relative flex items-center gap-4 mt-6 p-3 rounded-lg hover:bg-gray-100/60">
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {renderIcon()}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"} ${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;

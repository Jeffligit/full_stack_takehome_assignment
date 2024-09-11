
type TooltipCellProp = {
    colorClass: string;
    cellContent: string;
    tooltipContent: string;
}

export default function TooltipCell({colorClass, cellContent, tooltipContent}: TooltipCellProp) {

    return (
        <td className={`relative cursor-pointer group border border-black text-center ${colorClass}`}>{cellContent}
            <div className="absolute hidden group-hover:inline-block bg-gray-700 text-white left-1/2 bottom-[calc(100%+5px)] -translate-x-1/2 whitespace-nowrap rounded text-xs p-2">
                {tooltipContent}
            </div>
            <div className=" absolute hidden group-hover:inline-block border-[5px] left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-gray-700">
            </div>
        </td> 
    )
}
type TableProp = {
    headers: string[];
    rows: any[];
}

export default function Table({ headers, rows }: TableProp) {

    return (
        <table className="table w-full h-auto border border-black">
        <thead>
            <tr>
                {headers.map(
                    (header, index) => (
                        <th key={index} className="border border-black">{header}</th>
                    )
                )}
            </tr>
        </thead>
        <tbody>
            {
                rows.map(
                    (row, index) => (
                        <tr key={index}>
                           {headers.map(
                            (header) => {
                                return (<td className="border border-black text-center">{row[header.toLowerCase()]}</td>)
                            }
                           )}
                        </tr>
                    )
                )
            }
        </tbody>

    </table>

    )
};
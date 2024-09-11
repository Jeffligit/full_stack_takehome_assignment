// components/DataReview.tsx

// third party imports
import { useEffect, useState } from "react";

// directory imports
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import ErrorSummaryTable from "./ErrorSummaryTable/ErrorSummaryTable";
import { errors, error } from "./ErrorSummaryTable/ErrorSummaryTable.types";
import TooltipCell from "./TooltipCell/TooltipCell";


export default function DataReviewTable() {

    const [data, setData] = useState<any[]>([])
    const [showModal, setShowModal] = useState(false)
    const [errorSummary, setErrorSummary] = useState<errors<error>>({})

    const columnHeaders = [
        "ID",
        "Name",
        "Email",
        "City",
        "Zipcode",
        "Phone",
        "Status"
    ]

    useEffect(() => {
        fetch('/api/data')
        .then((res) => res.json())
        .then((resData) => {
            let flattenedData: any[] = [];
            resData['records'].map(
                (record: any) => {
                    flattenedData.push(flattenJSONObject(record))
                }
            )
            setData(flattenedData)
        })
    }, []);

    function handleExportCSV() {
        const csvContent = createCSVContent()
        const element = document.createElement("a")
        const file = new Blob([csvContent], {type: 'text/csv;charset=utf-8'})
        element.href = URL.createObjectURL(file)
        element.download = 'data.csv'
        document.body.appendChild(element)
        element.click()
        element.remove()
    }

    function createCSVContent() {
        let lowerCaseHeaders: string[] = []
        columnHeaders.map((header) => lowerCaseHeaders.push(header.toLowerCase()))
        let csvContent = lowerCaseHeaders.join(',') + '\r\n'
        data.forEach(element => {
            let temp: any[] = []
            lowerCaseHeaders.map(
                (header) => temp.push(element[header])
            )
            csvContent += temp.join(',') + '\r\n'
        });
        return csvContent
    }

    function handleErrorSummary(errors: errors<error>) {
       setErrorSummary(errors)
       setShowModal(true)
    }

    function flattenJSONObject(jsonObject: any) {
        let resultObj: any = {};

        for(const key in jsonObject) {
            if(typeof jsonObject[key] == 'object' && key != 'errors') {
                const tempObj: any = flattenJSONObject(jsonObject[key]);
                for (const tempKey in tempObj) {
                    resultObj[tempKey] = tempObj[tempKey];
                }
            } else {
                resultObj[key] = jsonObject[key];
            }
        }
        return resultObj
    }

    return (
        <div style={{ margin: "20px" }}>
            <h1>Data Review</h1>
            
            {/* Candidates will replace this placeholder with table, tooltips, and modals */}
            <div className="h-auto grid grid-flow-row bg-white w-auto">
                <div className="flex flex-row-reverse py-2">
                    <Button
                        label='Export to CSV'
                        color='blue'
                        onClick={handleExportCSV}
                    />
                </div>
                <table className="table w-auto border border-black">
                    <thead>
                        <tr>
                            {
                                columnHeaders.map(
                                    (column, index) => (
                                        <th key={`header ${index}`} className='border border-black'>{column}</th>
                                    )
                                )
                            }
                            <th key={'action'} className='border border-black'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(
                                (record, index) => {
                                    let errors = record['errors']
                                    return (
                                    <tr key={`'data review table row ${index}`}>
                                        {
                                            columnHeaders.map(
                                                (column, colIndex) => {
                                                    const lowerCaseColumn = column.toLowerCase()
                                                    let cellColor = 'bg-green-300'
                                                    let enableToolTip = false
                                                    let errorMessage = ""
                                                    if (lowerCaseColumn in errors) {
                                                        enableToolTip = true
                                                        errorMessage = errors[lowerCaseColumn]['message']
                                                        switch(errors[lowerCaseColumn]['severity']) {
                                                            case 'critical':
                                                                cellColor = 'bg-red-300'
                                                                break;
                                                            case 'warning':
                                                                cellColor = 'bg-yellow-200'
                                                                break;
                                                        }
                                                    }
                                                    return (
                                                        <> 
                                                        {
                                                            enableToolTip ? 
                                                                <TooltipCell 
                                                                    key={`row ${index} item ${colIndex}`} 
                                                                    cellContent={record[lowerCaseColumn]} 
                                                                    colorClass={cellColor} 
                                                                    tooltipContent={errorMessage}
                                                                /> 
                                                            :
                                                            <td key={`row ${index} item ${colIndex}`} className={`relative cursor-pointer group border border-black text-center ${cellColor}`}>{record[lowerCaseColumn]}</td>
                                                        }
                                                            
                                                        </>
                                                    )
                                                }
                                            )
                                            
                                        }
                                        <td key={`row ${index} action buttons`} className="border border-black p-1">
                                            <div className="flex justify-center">
                                                <Button
                                                    color="red"
                                                    label="Error Summary"
                                                    onClick={() => {handleErrorSummary(errors)}}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
            
            <Modal title="Error Summary" show={showModal} onClose={() => {setShowModal(false)}}>
                    {errorSummary && <ErrorSummaryTable errors={errorSummary}/>}
            </Modal>
        </div>
    );
}

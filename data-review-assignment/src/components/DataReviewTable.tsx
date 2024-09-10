// components/DataReview.tsx

import { useEffect, useState } from "react";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Table from "./Table/Table";
import ErrorSummaryTable from "./ErrorSummaryTable/ErrorSummaryTable";
import { errors, error } from "./ErrorSummaryTable/ErrorSummaryTable.types";

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
        .then((data) => {
            console.log(data)
            // flattan data['records'] before settings data
            setData(data['records'])
        })
    }, []);

    function handleExportCSV() {
        console.log(errorSummary)
        console.log(data)
        setShowModal(true)
    }

    function handleErrorSummary(errors: errors<error>) {
       setErrorSummary(errors)
       setShowModal(true)
    }

    return (
        <div style={{ margin: "20px" }}>
            <h1>Data Review</h1>
            {/* Candidates will replace this placeholder with table, tooltips, and modals */}
            <div className="h-auto grid grid-flow-row bg-white w-auto">
                <div className="flex flex-row-reverse p-2">
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
                                    (column) => (
                                        <th className='border border-black'>{column}</th>
                                    )
                                )
                            }
                            <th className='border border-black'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(
                                (record) => {
                                    let errors = record['errors']
                                    return (
                                    <tr>
                                        {
                                            columnHeaders.map(
                                                (column) => {
                                                    const lowerCaseColumn = column.toLowerCase()
                                                    let cellColor = 'bg-green-300'
                                                    if (lowerCaseColumn in errors) {
                                                        switch(errors[lowerCaseColumn]['severity']) {
                                                            case 'critical':
                                                                cellColor = 'bg-red-300'
                                                                break;
                                                            case 'warning':
                                                                cellColor = 'bg-yellow-200'
                                                        }
                                                    }
                                                    return (<td className={`border border-black text-center ${cellColor}`}>{record[lowerCaseColumn]}</td>)
                                                }
                                            )
                                            
                                        }
                                        <td className="border border-black p-1">
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

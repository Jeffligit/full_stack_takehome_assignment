import Table from "../Table/Table";
import { ErrorSummaryTableProp } from "./ErrorSummaryTable.types";


export default function ErrorSummaryTable({ errors }: ErrorSummaryTableProp) {
    const headers = ["Field", "Severity", "Message"];
    let rows = []
    if (errors) {
        for (const Key in errors) {
            rows.push(
                {
                    "field": Key,
                    ...errors[Key]
                }
            )
        }
    }

    return (
        <Table headers={headers} rows={rows}/>
    )
}
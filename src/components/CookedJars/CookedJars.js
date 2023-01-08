import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'BARCODE', width: 150 },
  { field: 'substrate', headerName: 'SUBSTRATO', width: 150 },
  { field: 'preparationDate', headerName: 'PREPARAZIONE', width: 150 },
];

export default function CookedJarsDataTable(props) {
 
  
  let rows = props.cookedjars
  console.log(rows)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

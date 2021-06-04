import React from "react";
import DataTable from "@salesforce/design-system-react/components/data-table";

type DatatableProps = {
  dataSource: any[];
  cols: any[];
  tableId: string;
  fixedHeader?: boolean;
  fixedLayout?: boolean;
  columnBordered?: boolean;
  // keyboardNavigation?: boolean;
};

const DatatableComponent = ({
  dataSource,
  cols,
  tableId,
  fixedHeader,
  fixedLayout,
  columnBordered,
}: DatatableProps) => {
  return (
    <DataTable
      items={dataSource}
      id={tableId}
      columnBordered={columnBordered}
      fixedHeader={fixedHeader}
      fixedLayout={fixedLayout}
    >
      {cols}
    </DataTable>
  );
};

export default DatatableComponent;

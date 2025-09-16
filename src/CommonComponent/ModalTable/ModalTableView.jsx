import React from "react";
import "../ModalTable/commonModalTable.scss";

const ModalTableView = ({ column, dataSource, classNames }) => {
  return (
    <div className={`table ${classNames}`}>
      <table className="modal-table-main">
        <thead className="table-header">
          <tr className="table-row">
            {column?.map((col) => (
              <th className="table-cols" key={col?.title}>
                {col?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {dataSource?.map((row) => (
            <tr className="table-body-row" key={row?.no}>
              <div className="table-body-cols">{row?.no}</div>
              <div className="table-body-cols">{row?.product}</div>
              <div className="table-body-cols">{row?.code}</div>
              <div className="table-body-cols">{row?.unitPrice}</div>
              <div className="table-body-cols">{row?.quantity}</div>
              <div className="table-body-cols">{row?.discount}</div>
              <div className="table-body-cols">{row?.tax}</div>
              <div className="table-body-cols">{row?.subTotal}</div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalTableView;

import React from "react";
import BadgeComponent from "../../../generic/Badge";
import { ICenterType } from "../../../models/center.interface";
import styles from "./styles.module.less";
import _ from "lodash";
import DatatableComponent from "../../../generic/Datatable";
import DataTableColumn from "@salesforce/design-system-react/components/data-table/column";
import DataTableCell from "@salesforce/design-system-react/components/data-table/cell";
import { toShortFormat } from "../../../utils/Helper";
import SlotsComponent from "../../Slots";

type BodyProps = {
  center: ICenterType;
};

const CenterBodyContent = ({ center }: BodyProps) => {
  let _activeSessions: number = 0;
  const _sessions: Object[] = center.sessions.map((s: any) => {
    if (s.available_capacity > 0) {
      _activeSessions = _activeSessions + 1;
    }
    return {
      ...s,
      id: s.session_id + s.date,
      classNameRow:
        s.available_capacity === 0
          ? `slds-text-color_weak ${styles.weakRow} weakRow`
          : "",
    };
  });

  const CustomDateCell = ({ children, ...props }: any) => {
    return (
      <DataTableCell {...props}>
        <p className="slds-text-body_small fontWeight700">
          {toShortFormat(children?.split("-").reverse().join("-"))}
        </p>
      </DataTableCell>
    );
  };

  const CustomAgeCell = ({ children, ...props }: any) => {
    return (
      <DataTableCell {...props}>
        <p className="" title={children?.toString().concat("+")}>
          {children?.toString().concat("+")}
        </p>
      </DataTableCell>
    );
  };

  const CustomAppointmentCell = ({ children, ...props }: any) => {
    const badgeClickHandler = () => {
      if (props.item?.available_capacity > 0) {
        window.open("https://selfregistration.cowin.gov.in/");
      }
    };

    return (
      <DataTableCell {...props}>
        <div
          className={`slds-list_vertical ${styles.appointmentClass} appointmentClass`}
        >
          <SlotsComponent
            slots={[...props.item?.slots]}
            cName={props.item?.available_capacity === 0 ? 'disabledBadgeCls' : ''}
            onClickEvent={badgeClickHandler}
          />
        </div>
      </DataTableCell>
    );
  };

  CustomDateCell.displayName = DataTableCell.displayName;
  CustomAgeCell.displayName = DataTableCell.displayName;
  CustomAppointmentCell.displayName = DataTableCell.displayName;

  const columns = [
    <DataTableColumn key="date" label="Date" property="date" width="12%">
      <CustomDateCell />
    </DataTableColumn>,

    <DataTableColumn
      key="vaccine"
      label="Vaccine Name"
      property="vaccine"
      width="15%"
    />,

    <DataTableColumn
      key="min_age_limit"
      label="Age"
      property="min_age_limit"
      width="6%"
    >
      <CustomAgeCell />
    </DataTableColumn>,

    <DataTableColumn
      key="available_capacity"
      label="Total Doses"
      property="available_capacity"
      width="12%"
    />,
    <DataTableColumn
      key="available_capacity_dose1"
      label="Dose 1"
      property="available_capacity_dose1"
      width="8%"
    />,
    <DataTableColumn
      key="available_capacity_dose2"
      label="Dose 2"
      property="available_capacity_dose2"
      width="8%"
    />,
    <DataTableColumn
      key="book_appointment"
      label="Appointment(s)"
      width="35%"
      title="Book Appointment"
    >
      <CustomAppointmentCell />
    </DataTableColumn>,
  ];

  return (
    <div className={`${styles.content} content`}>
      {center.isSessionAvailable && (
        <div className="slds-text-font_monospace slds-text-color_success slds-text-align_left slds-m-left_small">
          {`Showing ${_activeSessions} active vaccination session(s).`}
        </div>
      )}
      {!center.isSessionAvailable && (
        <div className="slds-text-font_monospace slds-text-color_error slds-text-align_left slds-m-left_small">
          {`No active vaccination session(s) found.`}
        </div>
      )}
      <div
        style={{
          overflow: "auto",
          height: _sessions.length > 2 ? "190px" : "120px",
        }}
        className="slds-m-around_small"
      >
        <DatatableComponent
          fixedHeader={true}
          fixedLayout={true}
          columnBordered={true}
          dataSource={_.orderBy(_sessions, ["available_capacity"], ["desc"])}
          cols={columns}
          tableId="vaccineSessionsTable"
        />
      </div>
    </div>
  );
};

export default CenterBodyContent;

import React, { useState } from "react";
import Accordion from "@salesforce/design-system-react/components/accordion";
import AccordionPanel from "@salesforce/design-system-react/components/accordion/panel";
import styles from "./styles.module.less";
import "./styles.css";

type AccordionProps = {
  dataSource: any;
  children: React.ReactElement;
  limit?: number;
  accordionId: string;
};

const AccordionComponent = ({
  dataSource,
  children,
  limit,
  accordionId,
}: AccordionProps) => {
  const [expandedPanels, setExpandedPanels] = useState<any>({});
  const togglePanel = (event: any, data: any) => {
    setExpandedPanels({
      [data.id]: !expandedPanels[data.id],
    });
  };

  return (
    <Accordion id={accordionId} className={styles.accordionSection}>
      {dataSource.map((item: any, i: any) => {
        const childrenWithProps = React.cloneElement(children, { item: item });
        return (
          <AccordionPanel
            expanded={!!expandedPanels[item.id]}
            id={item.id}
            key={item.id}
            onTogglePanel={(event) => togglePanel(event, item)}
            summary={item.summary}
          >
            {childrenWithProps}
          </AccordionPanel>
        );
      })}
    </Accordion>
  );
};

export default AccordionComponent;

import '../styles/AccordionColumns.css'
import React from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';

// Define the interface for the accordion data
interface AccordionItem {
  title: string;
  content?: string;
}

// Define the interface for the component props
interface AccordionColumnsProps {
  accordionData: AccordionItem[];
}

const AccordionColumns: React.FC<AccordionColumnsProps> = ({ accordionData }) => {
  return (
    <Container>
      <Row>
        {accordionData.map((item, index) => (
          <Col xs={12} key={index} className="task mb-3">
            <Accordion defaultActiveKey="0">
              <Accordion.Header>
                {item.title}
              </Accordion.Header>
              {item.content && (
                <Accordion.Body>
                  {item.content}
                </Accordion.Body>
              )}
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccordionColumns;
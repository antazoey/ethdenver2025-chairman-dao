import '../styles/AccordionColumns.css'
import React from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';

enum Valence {
  'None',
  'Heart',
  'Spirit',
}

// Define the interface for the accordion data
interface AccordionItem {
  title: string;
  content?: string;
  valence?: number;
}

// Define the interface for the component props
interface AccordionColumnsProps {
  accordionData: AccordionItem[];
  classPrefix?: string;
}

function getStyleNameFromValence(valence:Valence) {
  if (valence) {
    if (valence == Valence.Heart){ return 'primarily-heart'}
    else if (valence == Valence.Spirit) { return 'primarily-spirit'}
  }
  return ''
}

const AccordionColumns: React.FC<AccordionColumnsProps> = ({ accordionData, classPrefix }) => {
  return (
    <Container>
      <Row>
        {accordionData.map((item, index) => (
          <Col xs={12} key={index} className={ classPrefix + ' mb-3 ' + getStyleNameFromValence(item.valence as Valence)}>
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
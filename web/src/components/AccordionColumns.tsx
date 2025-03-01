import '../styles/AccordionColumns.css';
import React from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';

enum Valence {
  'None',
  'Health',
  'Spirit',
}

// Define the interface for the accordion data
interface AccordionItem {
  title: string;
  content?: string;
  valence?: number;
  overlayWidth?: string; // Add an optional overlayWidth property
  health?: number;
  spirit?: number;
}

// Define the interface for the component props
interface AccordionColumnsProps {
  accordionData: AccordionItem[];
  classPrefix?: string;
}

function getStyleNameFromValence(valence: Valence) {
  if (valence) {
    if (valence == Valence.Health) { return 'primarily-health' }
    else if (valence == Valence.Spirit) { return 'primarily-spirit' }
  }
  return ''
}

const AccordionColumns: React.FC<AccordionColumnsProps> = ({ accordionData, classPrefix }) => {
  return (
    <Container>
      <Row>
        {accordionData.map((item, index) => (
          <Col xs={12} key={index} className={classPrefix + ' mb-3 ' + getStyleNameFromValence(item.valence as Valence)}>
            <Accordion defaultActiveKey="0">
              <Accordion.Header
                className="accordion-header-overlay"
                style={{ '--overlay-width': item.overlayWidth || '0%' } as React.CSSProperties}
              >
                <Container>
                  <Row>
                    <Col md="9">
                      {item.title}
                    </Col>
                    <Col md="3">
                      <div className="icon-stack">
                        <div>{item.health}<img src="../assets/heart-icon.png" alt="" style={{ width: '24px', height: '24px' }} /></div>
                        <div>{item.spirit}<img src="../assets/spirit-icon.png" alt="" style={{ width: '24px', height: '24px' }} /></div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Header>
              {item.content && <Accordion.Body>{item.content}</Accordion.Body>}
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccordionColumns;

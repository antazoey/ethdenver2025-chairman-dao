import '../styles/AccordionColumns.css';
import React, {useState} from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';

enum Valence {
  'None',
  'Health',
  'Spirit',
}

// Define the interface for the accordion data
interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  valence?: number;
  overlayWidth?: string; // Add an optional overlayWidth property
  health?: number;
  spirit?: number;
  alreadyVoted?: boolean;
}

// Define the interface for the component props
interface AccordionColumnsProps {
  accordionData: AccordionItem[];
  classPrefix?: string;
  onClick?: (taskId: string) => void;
}

function getStyleNameFromValence(valence: Valence) {
  if (valence) {
    if (valence == Valence.Health) { return 'primarily-health' }
    else if (valence == Valence.Spirit) { return 'primarily-spirit' }
  }
  return ''
}

const AccordionColumns: React.FC<AccordionColumnsProps> = ({ accordionData, classPrefix, onClick }) => {
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null); // State for selected task ID
  return (
    <Container>
      <Row>
        {accordionData.map((item, index) => (
          <Col xs={12} key={index} className={classPrefix + ' mb-3 ' + getStyleNameFromValence(item.valence as Valence)}>
            <Accordion defaultActiveKey="0" className={item.alreadyVoted ? 'voted-already' : ''}>
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
              <Accordion.Body>
                <Container>
                  <Row className='mb-3'>
                    <Col>
                      {item.content}
                    </Col>
                  </Row>
                  {!item.alreadyVoted && (
                    <Row>
                      <Col>
                        <Button onClick={() => onClick(item.id)}>Rate Task</Button>
                      </Col>
                    </Row>
                  )}
                </Container>
              </Accordion.Body>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccordionColumns;

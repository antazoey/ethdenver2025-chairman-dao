import AccordionColumns from '../components/AccordionColumns';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

const Proposals: React.FC = () => {
  const accordionData = [
    {
      title: 'Proposal Item #1',
      content: 'This is the content for the first accordion item.',
    },
    {
      title: 'Accordion Item #2',
    },
    {
      title: 'Accordion Item #3',
      content: 'This is the content for the third accordion item.',
    },
    {
      title: 'Accordion Item #4',
      content: 'This is the content for the fourth accordion item.',
    },
  ];

  return (
    <Container id="proposals" className="proposals">
      <Row>
        <Col xs={12} md={6} id="proposed-tasks" className="taskColumn">
          <h2>Open Proposals</h2>
          <AccordionColumns accordionData={accordionData} />
          <Container>
            <Row>
              <Col xs={12} className="task mb-3">
                <button className="button-secondary">Add Proposal</button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={6} id="active-tasks" className="taskColumn">
          <h2>Proposal History</h2>
          <AccordionColumns accordionData={accordionData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Proposals;

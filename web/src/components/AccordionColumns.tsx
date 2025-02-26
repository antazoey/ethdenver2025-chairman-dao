import React from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';

const AccordionColumns: React.FC = () => {
  const accordionData = [
    {
      title: 'Accordion Item #1',
      content: 'This is the content for the first accordion item.',
    },
    {
      title: 'Accordion Item #2',
      content: 'This is the content for the second accordion item.',
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
    <Container>
      <Row>
        {accordionData.map((item, index) => (
          <Col xs={12} key={index} className="mb-3">
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Header as={Card.Header} eventKey="0">
                  {item.title}
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>{item.content}</Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccordionColumns;
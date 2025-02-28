import AccordionColumns from '../components/AccordionColumns';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import React from 'react';

const Tasks: React.FC = () => {
  const accordionData = [
    {
      title: 'Task Item #1',
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
    <Container id='tasks' className='tasks'>
        <Row>
            <Col xs={12} md={6} id='proposed-tasks' className='taskColumn'>
            <h2>Proposed Tasks</h2>
            <AccordionColumns accordionData={accordionData}/>
            <Container>
              <Row>
                <Col xs={12} className='task mb-3'>
                    <ProgressBar now={60} label={`60%`} />
                </Col>
              </Row>
              <Row>
              <Col xs={12} className='task mb-3'>
                  <button className='button-primary'>Add Task</button>
              </Col>
              </Row>
            </Container>
            </Col>
            <Col xs={12} md={6} id='active-tasks' className='taskColumn'>
            <h2>Ready Tasks</h2>
            <AccordionColumns accordionData={accordionData}/>
            </Col>
        </Row>
    </Container>
  )
}

export default Tasks

import '../styles/ProgressBar.css';
import AccordionColumns from '../components/AccordionColumns';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import React from 'react';
import { chairman_dao } from "../declarations/chairman_dao";

enum Valence {
  'None',
  'Heart',
  'Spirit',
}

const Tasks: React.FC = () => {
  const accts = chairman_dao.list_tasks()
  accts.then(console.log)

  const accordionData = [
    {
      title: 'Task Item #1',
      content: 'This is the content for the first accordion item.',
      valence: Valence.None
    },
    {
      title: 'Accordion Item #2',
    },
    {
      title: 'Accordion Item #3',
      content: 'This is the content for the third accordion item.',
      valence: Valence.Heart
    },
    {
      title: 'Accordion Item #4',
      content: 'This is the content for the fourth accordion item.',
      valence: Valence.Spirit
    },
  ];

  return (
    <Container id='tasks' className='tasks'>
        <Row>
            <Col xs={12} md={6} id='proposed-tasks' className='taskColumn'>
            <h2>Proposed Tasks</h2>
            <AccordionColumns accordionData={accordionData} classPrefix='task'/>
            <Container>
              <Row>
                <Col xs={12} className='task mb-3'>
                    <ProgressBar>
                      <ProgressBar variant="health" now={10} key={1} />
                      <ProgressBar striped variant="health" now={35} key={2} />
                      <ProgressBar striped variant="spirit" now={20} key={3} />
                      <ProgressBar variant="spirit" now={10} key={4} />
                    </ProgressBar>
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
            <AccordionColumns accordionData={accordionData} classPrefix='task'/>
            </Col>
        </Row>
    </Container>
  );
};

export default Tasks;

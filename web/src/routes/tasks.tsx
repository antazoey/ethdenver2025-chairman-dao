import AccordionColumns from '../components/AccordionColumns';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

const Tasks: React.FC = () => {

  return (
    <Container id="tasks" className="tasks">
        <Row>
            <Col xs={12} md={6} id="proposed-tasks" className='taskColumn'>
            <h2>Proposed Tasks</h2>
            <AccordionColumns />
            <Container>
                <Row>
                <Col xs={12} className="task mb-3">
                    <button className="button-primary">Add Task</button>
                </Col>
                </Row>
            </Container>
            </Col>
            <Col xs={12} md={6} id="active-tasks" className='taskColumn'>
            <h2>Ready Tasks</h2>
            <AccordionColumns />
            </Col>
        </Row>
    </Container>
  )
}

export default Tasks

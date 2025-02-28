import AccordionColumns from '../components/AccordionColumns';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

const Proposals: React.FC = () => {

  return (
    <Container id='proposals' className='proposals'>
        <Row>
            <Col xs={12} md={6} id='proposed-tasks' className='taskColumn'>
            <h2>Open Proposals</h2>
            <AccordionColumns />
            <Container>
                <Row>
                <Col xs={12} className='task mb-3'>
                    <button className='button-primary'>Add Proposal</button>
                </Col>
                </Row>
            </Container>
            </Col>
            <Col xs={12} md={6} id='active-tasks' className='taskColumn'>
            <h2>Proposal History</h2>
            <AccordionColumns />
            </Col>
        </Row>
    </Container>
  )
}

export default Proposals

import AccordionColumns from '../components/AccordionColumns';
import { Container, Row, Col } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {chairman_dao} from "../declarations/chairman_dao";
import { useNavigate } from 'react-router-dom';

const Proposals: React.FC = () => {

  const [proposals, setProposals] = useState<any[]>([]); // Store fetched tasks

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProposals() {
      try {
        const data = await chairman_dao.list_proposals();
        setProposals(data); // Updates state, triggers re-render
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    }

    fetchProposals();
  }, []); // Empty dependency array = runs only on mount

  const handleNavigateToTasks = () => {
    navigate('/');
  };

  return (
    <Container id="proposals" className="proposals">
      <Row>
        <Col xs={12} md={6}>
          <div className="icon-stack">
            <img src="../assets/heart-icon.png" alt="" style={{ width: '192px', height: '192px' }} />
            <h3>24.3</h3>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="icon-stack">
            <img src="../assets/spirit-icon.png" alt="" style={{ width: '192px', height: '192px' }} />
            <h3>7.2</h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} id="proposed-tasks" className="taskColumn">
          <h2>Open Proposals</h2>
          <AccordionColumns accordionData={
            proposals.filter(proposal => proposal.state.Open === null)
            .map(proposal => ({
              id: proposal.id,
            title: proposal.title || "Unnamed Task", // Adjust based on actual structure
            content: proposal.description || "No description available"
          }))}/>
          <Container>
            <Row>
              <Col xs={12} className="task mb-9">
                <button className="button-secondary">Add Proposal</button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="task mb-3">
                <button onClick={handleNavigateToTasks} className="button-primary">Go to Tasks</button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={6} id="active-tasks" className="taskColumn">
          <h2>Proposal History</h2>
          <AccordionColumns accordionData={
            proposals.filter(proposal => proposal.state.Open === undefined)
            .map(proposal => ({
              id: proposal.id,
            title: proposal.title || "Unnamed Task", // Adjust based on actual structure
            content: proposal.description || "No description available"
          }))}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Proposals;

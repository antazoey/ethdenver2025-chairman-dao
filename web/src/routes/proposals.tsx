import AccordionColumns from '../components/AccordionColumns';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {chairman_dao} from "../declarations/chairman_dao";
import { useNavigate } from 'react-router-dom';
import CreateProposalForm from '../components/CreateProposalForm';

const Proposals: React.FC = () => {

  const [proposals, setProposals] = useState<any[]>([]); // Store fetched oroposals
  const [showModal, setShowModal] = useState(false);
  const [newProposalTitle, setNewProposalTitle] = useState<string>('');
  const [newProposalDescription, setNewProposalDescription] = useState<string>('');
  const [newProposalNotes, setNewProposalNotes] = useState<string>('');

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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

    const handleSubmitProposal = () => {
      console.log(chairman_dao)
      console.log(`New proposal title ${newProposalTitle}, descriptions: ${newProposalDescription}`);
      chairman_dao.submit_proposal(newProposalTitle || '', newProposalDescription || '', newProposalNotes || '', false).then(console.log)
      setShowModal(false);
    };

  const handleNavigateToTasks = () => {
    navigate('/');
  };

  return (
    <Container id="proposals" className="proposals">
      {/* <Row>
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
      </Row> */}
      <Row>
        <Col xs={12} md={6} id="proposed-Proposals" className="ProposalColumn">
          <h2>Open Proposals</h2>
          <AccordionColumns accordionData={
            proposals.filter(proposal => proposal.state.Open === null)
            .map(proposal => ({
              id: proposal.id,
              title: proposal.title,
              content: proposal.description,
            }))}/>
          <Container>
            <Row>
              <Col xs={12} className="Proposal mb-5">
                <button onClick={handleShowModal} className="button-secondary">Add Proposal</button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="Proposal mb-3">
                <button onClick={handleNavigateToTasks} className="button-primary">Go to Tasks</button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={6} id="active-Proposals" className="ProposalColumn">
          <h2>Proposal History</h2>
          <AccordionColumns accordionData={
            proposals.filter(proposal => proposal.state.Open === undefined)
            .map(proposal => ({
              id: proposal.id,
              title: proposal.title,
              content: proposal.description,
              showBar: false,
            }))}/>
        </Col>
      </Row>
      
      {/* Modal for creating a new proposal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProposalForm 
            handleTitleSet={setNewProposalTitle} 
            handleDescriptionSet={setNewProposalDescription} 
            handleNotesSet={setNewProposalNotes}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitProposal}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Proposals;

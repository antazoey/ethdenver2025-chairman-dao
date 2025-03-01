import '../styles/ProgressBar.css';
import AccordionColumns from '../components/AccordionColumns';
import CreateTaskForm from '../components/CreateTaskForm';
import { Col, Container, Modal, Row, ProgressBar, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { chairman_dao } from "../declarations/chairman_dao";

enum Valence {
  'None',
  'Heart',
  'Spirit',
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<any[]>([]); // Store fetched tasks
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await chairman_dao.list_tasks();
        setTasks(data); // Updates state, triggers re-render
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []); // Empty dependency array = runs only on mount

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container id='tasks' className='tasks'>
        <Row>
            <Col xs={12} md={5} id='proposed-tasks' className='taskColumn'>
            <h2>Proposed Tasks</h2>
              <AccordionColumns
                accordionData={tasks
                  .filter(task => task.state.Pending === null) // Filter only "Open" tasks
                  .map(task => ({
                    title: task.title || "Unnamed Task",
                    content: task.description || "No description available"
                  }))}
              />
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
                  <Button className='button-primary' onClick={handleShowModal}>Add Task</Button>
              </Col>
              </Row>
            </Container>
            </Col>
            <Col xs={12} md={7} id='active-tasks' className='taskColumn'>
            <h2>Ready Tasks</h2>
              <AccordionColumns
                accordionData={tasks
                  .filter(task => task.state.Open === null) // Filter only "Open" tasks
                  .map(task => ({
                    title: task.title || "Unnamed Task",
                    content: task.description || "No description available"
                  }))}
              />
            </Col>
        </Row>

        {/* Modal for creating a new task */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateTaskForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  );
};

export default Tasks;

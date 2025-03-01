import '../styles/ProgressBar.css';
import AccordionColumns from '../components/AccordionColumns';
import CreateTaskForm from '../components/CreateTaskForm';
import { Col, Container, Modal, Row, ProgressBar, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { chairman_dao } from "../declarations/chairman_dao";
import { divideAndDisplayAsPercentage } from '../utils/utils';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Store fetched tasks
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [newTaskTitle, setNewTaskTitle] = useState<string>();
  const [newTaskDescription, setNewTaskDescription] = useState<string>();

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

  const handleSubmitTask = () => {
    console.log(chairman_dao)
    let voting_power = { health: BigInt(0), spirit: BigInt(0) }
    console.log(`New task title ${newTaskTitle}, descriptions: ${newTaskDescription}`);
    chairman_dao.submit_task(newTaskTitle || '', newTaskDescription || '', voting_power).then(console.log)
    setShowModal(false);
  };

  return (
    <Container id='tasks' className='tasks'>
      <Row>
        <Col xs={12} md={5} id='proposed-tasks' className='taskColumn'>
          <h2>Proposed Tasks</h2>
          <AccordionColumns
            accordionData={tasks
              .filter(task => task.state.Pending === null) // Filter only "Pending" tasks
              .map(task => ({
                title: task.title,
                content: task.description,
                overlayWidth: divideAndDisplayAsPercentage(task.ratings.length, 3),
                health: task.ratings.length > 0 ? task.ratings[0].health : undefined,
                spirit: task.ratings.length > 0 ? task.ratings[0].spirit : undefined,
              }))}
            classPrefix={'task'}
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
                <Button onClick={handleShowModal}>Add Task</Button>
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
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskForm handleTitleSet={setNewTaskTitle} handleDescriptionSet={setNewTaskDescription} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tasks;

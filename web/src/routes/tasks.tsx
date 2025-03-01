import '../styles/ProgressBar.css';
import AccordionColumns, {Valence} from '../components/AccordionColumns';
import CreateTaskForm from '../components/CreateTaskForm';
import EstimateForm from '../components/EstimateForm';  
import { Col, Container, Modal, Row, ProgressBar, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { chairman_dao } from "../declarations/chairman_dao";
import { divideAndDisplayAsPercentage } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Store fetched tasks
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showJudgeModal, setShowJudgeModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [newTaskHealth, setNewTaskHealth] = useState<number>(0);
  const [newTaskSpirit, setNewTaskSpirit] = useState<number>(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null); // State for selected task ID

  const navigate = useNavigate();

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
  const handleShowTaskModal = () => setShowTaskModal(true);
  const handleShowJudgeModal = () => setShowJudgeModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowTaskModal(false);
    setShowJudgeModal(false);
  };

  const handleSubmitTask = () => {
    console.log(chairman_dao)
    let voting_power = { health: BigInt(newTaskHealth), spirit: BigInt(newTaskSpirit) }
    console.log(`New task title ${newTaskTitle}, descriptions: ${newTaskDescription}`);
    chairman_dao.submit_task(newTaskTitle || '', newTaskDescription || '', voting_power).then(console.log)
    setShowModal(false);
  };

  const handleSubmitRating = () => {
    console.log(chairman_dao)
    let voting_power = { health: BigInt(newTaskHealth), spirit: BigInt(newTaskSpirit) }
    chairman_dao.rate_task(BigInt(selectedTaskId), voting_power).then(console.log)
    setShowTaskModal(false);
  };

  const handleSubmitJudging = () => {
    console.log(chairman_dao)
    let voting_power = { health: BigInt(newTaskHealth), spirit: BigInt(newTaskSpirit) }
    //chairman_dao.judge_claimant(BigInt(0), voting_power).then(console.log)
    setShowTaskModal(false);
  };

  const handleNavigateToProposals = () => {
    navigate('/proposals');
  };

  const handleRateTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowTaskModal(true);
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
                id: task.id,
                title: task.title,
                content: task.description,
                overlayWidth: divideAndDisplayAsPercentage(task.ratings.length, 4),
                health: Number(task.estimated_health),
                spirit: Number(task.estimated_spirit),
                alreadyVoted: task.ratings.some(([principal]) => principal === 'principal')
              }))}
            classPrefix={'task'}
            onClick={handleRateTaskClick}
          />
          <Container>
            <Row>
              <Col xs={12} className='task mb-3'>
                <ProgressBar>
                  <ProgressBar variant="health" now={40} key={1} />
                  <ProgressBar striped variant="health" now={35} key={2} />
                  <ProgressBar striped variant="spirit" now={20} key={3} />
                  <ProgressBar variant="spirit" now={10} key={4} />
                </ProgressBar>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className='task mb-3'>
                <button onClick={handleShowModal} className="button-primary">Add Task</button>
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
                id: task.id,
                title: task.title,
                content: task.description,
                health: Number(task.estimated_health),
                spirit: Number(task.estimated_spirit),
                valence: Number(task.estimated_health) > Number(task.estimated_spirit) ? Valence.Health : Valence.Spirit
              }))}
            classPrefix={'task'}
            onClick={handleShowJudgeModal}
          />
          <Container className='desktop-only-spacer'>
            <Row>
              <Col xs={12} className='task mb-3'>
                <button onClick={handleNavigateToProposals} className='button-secondary'>Go to Proposals</button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      {/* Modal for creating a new task */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskForm 
            handleTitleSet={setNewTaskTitle} 
            handleDescriptionSet={setNewTaskDescription} 
            handleHealthSet={setNewTaskHealth} 
            handleSpiritSet={setNewTaskSpirit} 
          />
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
      <Modal show={showTaskModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EstimateForm 
            handleHealthSet={setNewTaskHealth} 
            handleSpiritSet={setNewTaskSpirit}
            handleIdSet={setSelectedTaskId}
          />
          <p>Rating task with ID: {selectedTaskId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitRating}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showJudgeModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Judge Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EstimateForm 
            handleHealthSet={setNewTaskHealth} 
            handleSpiritSet={setNewTaskSpirit}
            handleIdSet={setSelectedTaskId}
          />
          <p>Rating task with ID: {selectedTaskId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitJudging}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tasks;

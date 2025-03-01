import '../styles/ProgressBar.css';
import AccordionColumns from '../components/AccordionColumns';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { chairman_dao } from "../declarations/chairman_dao";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

enum Valence {
  'None',
  'Heart',
  'Spirit',
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<any[]>([]); // Store fetched tasks

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

  return (
    <Container id='tasks' className='tasks'>
        <Row>
            <Col xs={12} md={6} id='proposed-tasks' className='taskColumn'>
            <h2>Proposed Tasks</h2>
              <AccordionColumns accordionData={tasks.map(task => ({
                title: task.title || "Unnamed Task", // Adjust based on actual structure
                content: task.description || "No description available"
              }))}/>
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
              <AccordionColumns accordionData={tasks.map(task => ({
                title: task.title || "Unnamed Task", // Adjust based on actual structure
                content: task.description || "No description available"
              }))}/>
            </Col>
        </Row>
    </Container>
  );
};

export default Tasks;

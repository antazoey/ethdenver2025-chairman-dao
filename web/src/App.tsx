import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AccordionColumns from './components/AccordionColumns';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  return (
    <div className="App">
      <Container id="tasks">
        <Row>
          <Col xs={12} md={6} id="proposed-tasks">
            <AccordionColumns />
          </Col>
          <Col xs={12} md={6} id="active-tasks">
            <AccordionColumns />
          </Col>
        </Row>
      </Container>
        
    </div>
  )
}

export default App

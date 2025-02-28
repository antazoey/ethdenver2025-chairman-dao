import Form from 'react-bootstrap/Form';

function CreateTaskForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="taskForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="What will you be doing?" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="taskForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
}

export default CreateTaskForm;
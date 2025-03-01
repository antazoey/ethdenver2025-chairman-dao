import Form from 'react-bootstrap/Form';

function CreateTaskForm({handleTitleSet, handleDescriptionSet}) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="taskForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="What will you be doing?"
          onChange={(e) => handleTitleSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="taskForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => handleDescriptionSet(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default CreateTaskForm;
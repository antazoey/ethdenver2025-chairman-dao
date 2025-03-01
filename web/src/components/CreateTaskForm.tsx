import Form from 'react-bootstrap/Form';

function CreateTaskForm({handleTitleSet, handleDescriptionSet, handleHealthSet, handleSpiritSet}) {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='taskForm.ControlInput1'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder='What will you be doing?'
          onChange={(e) => handleTitleSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='taskForm.ControlTextarea1'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          onChange={(e) => handleDescriptionSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='taskForm.ControlInput2'>
        <Form.Label>Health</Form.Label>
        <Form.Control
          placeholder='Enter a number between 1 and 10'
          type='number'
          onChange={(e) => handleHealthSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='taskForm.ControlInput3'>
        <Form.Label>Spirit</Form.Label>
        <Form.Control
          placeholder='Enter a number between 1 and 10'
          type='number'
          onChange={(e) => handleSpiritSet(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default CreateTaskForm;
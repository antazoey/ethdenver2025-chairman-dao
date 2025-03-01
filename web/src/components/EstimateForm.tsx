import Form from 'react-bootstrap/Form';

function EstimateForm({handleHealthSet, handleSpiritSet, handleIdSet}) {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='taskForm.ControlInput1'>
        <Form.Label>Health</Form.Label>
        <Form.Control
          placeholder='Enter a number between 1 and 10'
          type='number'
          onChange={(e) => handleHealthSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='taskForm.ControlInput2'>
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

export default EstimateForm;
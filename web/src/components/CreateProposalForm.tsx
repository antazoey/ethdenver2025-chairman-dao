import Form from 'react-bootstrap/Form';

function CreateProposalForm({handleTitleSet, handleDescriptionSet, handleNotesSet}) {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='proposalForm.ControlInput1'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder='What will you be doing?'
          onChange={(e) => handleTitleSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='proposalForm.ControlTextarea1'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          onChange={(e) => handleDescriptionSet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='proposalForm.ControlTextarea2'>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          onChange={(e) => handleNotesSet(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default CreateProposalForm;
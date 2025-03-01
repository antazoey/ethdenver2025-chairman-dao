import { randomNumber } from '@dfinity/agent';
import React, {useState} from 'react';

import {ProgressBar} from 'react-bootstrap';

interface VotingBarProps {}

const VotingBar:React.FC<VotingBarProps> = ({}) => {

  const [proposals, setProposals] = useState<any[]>([]); // Store fetched tasks

  return (

    <ProgressBar className='mb-3'>
        <ProgressBar variant="health" now={Math.floor(Math.random() * 30)} key={1} />
        <ProgressBar striped variant="health" now={Math.floor(Math.random() * 30)} key={2} />
        <ProgressBar striped variant="spirit" now={Math.floor(Math.random() * 30)} key={3} />
        <ProgressBar variant="spirit" now={Math.floor(Math.random() * 30)} key={4} />
    </ProgressBar>
  );
};

export default VotingBar;
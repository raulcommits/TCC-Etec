import React from 'react';
import './Botao.css';
import { Button } from 'react-bootstrap';

const Botao = ({children}) => {
  return (
    <Button className='botao' as='Button'>
        {children}
    </Button>
  );
};

export default Botao;
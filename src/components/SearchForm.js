import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef } from 'react';

const SearchForm = ({ onSearch, sortByCriteria }) => {
  const inputRef = useRef(null);

  return (
    <Form>
      <Row>
        <Col xs={3}>
          <Form.Select
            aria-label='Default select example'
            className='mv-5'
            onChange={(e) => {
              if (e.target.value) {
                inputRef.current.style.display = 'none';
                sortByCriteria(e.target.value);
              }
            }}
          >
            <option ref={inputRef} style={{ color: 'gray' }}>
              Sort By
            </option>
            <option value='releaseDate'>Year</option>
            <option value='episodeId'>Episode</option>
            <option value='ratings'>Rating</option>
          </Form.Select>
        </Col>
        <Col xs={9}>
          <InputGroup className='mb-5' xs={9}>
            <Form.Control onChange={onSearch} placeholder='Search Movies' />
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;

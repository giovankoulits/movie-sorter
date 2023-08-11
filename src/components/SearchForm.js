import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
const SearchForm = ({ onSearch, sortByCriteria }) => {
  const inputRef = useRef(null);

  return (
    <div
      className='px-3'
      style={{
        background: '#F7F8FA',
        borderBottom: '1px solid #F2F4F6',
        borderRadius: '5px',
      }}
    >
      <Form>
        <Row>
          <Col xs={12} md={3}>
            <Form.Select
              aria-label='Default select example'
              className='mt-3 mb-0 my-md-3'
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
          <Col xs={12} md={9}>
            <InputGroup className='my-3'>
              <InputGroup.Text id='basic-addon1'>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control onChange={onSearch} placeholder='Search Movies' />
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;

//Hooks
import { useRef } from 'react';
//Bootstrap components
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Bootstrap icons
import { ImSearch } from 'react-icons/im';

const SearchForm = ({ onSearch, sortByCriteria }) => {
  const inputRef = useRef(null);

  return (
    <div
      className='px-3  my-form-bg'
      style={{
        /* background: 'var(--bg-form)', */
        borderRadius: '5px',
      }}
    >
      <Form>
        <Row>
          <Col xs={12} md={3}>
            <Form.Select
              className='mt-3 mb-0 my-md-3'
              onChange={(e) => {
                if (e.target.value) {
                  //Remove "Sort By" option after selection
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
              <InputGroup.Text>
                <ImSearch style={{ color: 'var(--star-color)' }} />
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

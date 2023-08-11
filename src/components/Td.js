import React from 'react';
import Highlighter from 'react-highlight-words';

const Td = ({ movieData, search }) => {
  let string = movieData;

  if (typeof movieData === 'number') {
    string = 'EPISODE' + movieData;
  }

  return (
    <td className='py-3'>
      <Highlighter
        highlightStyle={{
          fontWeight: 600,
        }}
        highlightClassName='MyHighlightClass'
        searchWords={[search]}
        autoEscape={true}
        textToHighlight={string}
      />
    </td>
  );
};

export default Td;

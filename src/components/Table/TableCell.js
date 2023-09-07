// Highlight searched text in table cell
import Highlighter from 'react-highlight-words';

const TableCell = ({ search, movieData }) => {
  let string = movieData;

  if (typeof movieData === 'number') {
    string = 'EPISODE' + ' ' + movieData;
  }

  return (
    <td className='py-3 bg-transparent'>
      <Highlighter
        highlightClassName='myHighlightClass'
        searchWords={[search]}
        autoEscape={true}
        textToHighlight={string}
      />
    </td>
  );
};

export default TableCell;

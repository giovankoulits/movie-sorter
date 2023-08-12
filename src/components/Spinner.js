const Spinner = () => {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <div
        className='spinner-border '
        role='status'
        style={{ width: '50px', height: '50px', color: 'var(--spinner-color)' }}
      ></div>
    </div>
  );
};

export default Spinner;

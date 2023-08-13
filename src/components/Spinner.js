const Spinner = () => {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <h3 style={{ color: 'var(  --heading-color)' }}>
        Loading your movies&nbsp;
      </h3>
      <div
        className='spinner-border mb-4'
        role='status'
        style={{
          width: '30px',
          height: '30px',
          color: 'var(--highlight-color)',
        }}
      ></div>
    </div>
  );
};

export default Spinner;

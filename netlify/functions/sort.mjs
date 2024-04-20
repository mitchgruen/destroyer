const testFunc = async (req, context) => {
  console.log('This is a test of the sort serverless function')
  return new Response('This is a test of the sort serverless function');
};

export default testFunc;

export const urlMatcher = (url) => {
  return url.match(
    /\/api\/tasks\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  )
    ? true
    : false;
};

export const doesExist = (taskArr, taskId) => {
  return taskArr.find((task) => task.id === taskId);
};

export const createRequestBody = (req, res, callback) => {
  let body = '';

  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body += chunk;
    })
    .on('end', () => {
      callback(body, res);
    });
};

export const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const date = new Date();

  return date.toLocaleDateString('en-US', options);
};

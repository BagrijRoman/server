
export const handleApiError = (res, status, data = {}) => {
  console.log('Api error. Info: ', data);

  res.status(status);
  res.json(data);
}

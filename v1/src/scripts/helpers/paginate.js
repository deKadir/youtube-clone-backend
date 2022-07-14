const paginate = async (req, operation) => {
  let { limit, page } = req.query;
  limit = limit || 12;
  const result = await operation.skip((page - 1) * limit).limit(limit);
  return {
    result,
    limit: parseInt(limit),
    current: parseInt(page),
    next: parseInt(page) + 1,
  };
};

export default paginate;

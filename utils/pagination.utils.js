export const paginateQuery = async (model, query = {}, options = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);

  return {
    count: total,
    data,
    pagination: {
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    },
  };
};

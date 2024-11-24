exports.formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

exports.formatPaginatedResponse = (success, message, data, pagination) => {
  return {
    success,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
    },
    timestamp: new Date().toISOString(),
  };
};

exports.formatError = (message, errors = null) => {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
};

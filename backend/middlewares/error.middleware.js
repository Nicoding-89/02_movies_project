const errors = {
  e400: (req, res, error) => {
    res.status(400).json({
      status: 400,
      error: 'Bad request.',
      message: error.message || 'The request could not be processed due to a client error.'
    });
  },
  e404: (req, res, error) => {
    res.status(404).json({
      status: 404,
      error: 'Not found.',
      message: error.message || 'The requested resource could not be found.'
    });
  },
  e500: (req, res, error) => {
    res.status(500).json({
      status: 500,
      error: 'Internal server error.',
      message: error.message || 'An unexpected error occurred. Please try again later.'
    });
  }
};

export default errors;
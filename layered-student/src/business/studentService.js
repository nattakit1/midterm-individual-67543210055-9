const repo = require('../data/studentRepository');

exports.getAll = async () => {
  return repo.findAll();
};

exports.create = async (data) => {
  return repo.insert(data);
};

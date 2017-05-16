const Group = require('../models/group');

function groupsIndex(req, res, next) {
  Group
    .find()
    .exec()
    .then(groups => {
      return res.status(200).json(groups);
    })
    .catch(next);
}

function groupsCreate(req, res, next) {
  Group
    .create(req.body)
    .then(group => {
      // console.log('req.body inside groupsCreate:', req.body);
      res.status(201).json(group);
    })
    .catch(next);
}

function groupsShow(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('admin')
    .populate(['members'])
    .populate(['comments.user'])
    .exec()
    .then(group => {
      if (!group) {
        const error = new Error('No group was found');
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(group);
    })
    .catch(next);
}

function groupsUpdate(req, res, next) {
  Group
    .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(group => res.status(200).json(group))
    .catch(next);
}

function groupsDelete(req, res, next) {
  Group
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: groupsIndex,
  create: groupsCreate,
  show: groupsShow,
  update: groupsUpdate,
  delete: groupsDelete
};

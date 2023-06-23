const Student = require('../models/student.model')

exports.create = (req, res) => {
    return new Promise((resolve, reject) => {
        if (!req.body.name) {
            return res.status(400).send({
                'message': 'Name cant be empty'
            });
        }

        if (!req.body.age) {
            return res.status(400).send({
                'message': 'Age cant be empty'
            });
        }

        const student = new Student({
            name: req.body.name || 'Untitled',
            age: req.body.age,
            major: req.body.major
        });

        student.save()
            .then(data => {
                res.send(data);
                resolve(data);
            })
            .catch(err => {
                res.status(500).send({
                    'message': 'Something went wrong!!',
                    'error': err
                });
                reject(err);
            });
    });
};

exports.update = (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id;

        Student.findByIdAndUpdate(id, {
            name: req.body.name || 'Untitled',
            age: req.body.age,
            major: req.body.major
        }, { new: true })
            .then(student => {
                res.send(student);
                resolve(student);
            })
            .catch(err => {
                res.status(500).send({
                    'message': 'Something went wrong!!',
                    'error': err
                });
                reject(err);
            });
    });
};
exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Student.find()
            .then(students => {
                res.send(students);
                resolve(students);
            })
            .catch(err => {
                res.status(500).send({
                    'message': 'Something went wrong!!',
                    'error': err
                });
                reject(err);
            });
    });
};

exports.findOne = (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id;

        Student.findById(id)
            .then(students => {
                if (!students) {
                    res.status(400).send({
                        'message': 'Student info not available!'
                    });
                    reject(new Error('Student info not available!'));
                } else {
                    res.send(students);
                    resolve(students);
                }
            })
            .catch(err => {
                res.status(500).send({
                    'message': 'Something went wrong!!',
                    'error': err
                });
                reject(err);
            });
    });
};

exports.delete = (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id;
        Student.findByIdAndRemove(id)
            .then(students => {
                res.send({
                    'message': 'Removed!'
                });
                resolve();
            })
            .catch(err => {
                res.status(500).send({
                    'message': 'Something went wrong!!',
                    'error': err
                });
                reject(err);
            });
    });
};
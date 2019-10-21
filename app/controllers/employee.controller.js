const Employee = require('../models/employee.model.js');

// create new detail in database
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Employee name cannot be empty"
        });
    }

    if(!req.body.dateofbirth) {
        return res.status(400).send({
            message: "Employee dateofbirth cannot be empty"
        });
    }
    if(!req.body.salary) {
        return res.status(400).send({
            message: "Employee salary cannot be empty"
        });
    }
    if(!req.body.skills) {
        return res.status(400).send({
            message: "Employee skills cannot be empty"
        });
    }
    if(!req.body.imageurl) {
        return res.status(400).send({
            message: "Employee imageurl cannot be empty"
        });
    }

    // Create new entry in database
    const employee = new Employee({
        name: req.body.name,
        dateofbirth: req.body.dateofbirth,
        salary: req.body.salary,
        skills: req.body.skills,
        imageurl:req.boby.imageurl
    });

    // Save details in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocuured while creating new entry to the database."
        });
    });
};

// Retrieve all employee details from database
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error While fetch Employees details"
        });
    });
};

// Retrieve single employee detail from database
exports.findOne = (req, res) => {
    Employee.findOne({"_id": req.params.employeeId})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee detail not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee detail not found with id " + req.params.employeeId
            });
        }
        return res.status(500).send({
            message: "Error retrieving employee detail with id " + req.params.employeeId
        });
    });
};

// Update details of employee  (from database) using employeeId
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Employee name cannot be empty"
        });
    }

    if(!req.body.dateofbirth) {
        return res.status(400).send({
            message: "Employee dateofbirth cannot be empty"
        });
    }
    if(!req.body.salary) {
        return res.status(400).send({
            message: "Employee salary cannot be empty"
        });
    }
    if(!req.body.skills) {
        return res.status(400).send({
            message: "Employee skills cannot be empty"
        });
    }
    if(!req.body.imageurl) {
        return res.status(400).send({
            message: "Employee imageurl cannot be empty"
        });
    }

    // Find employee and update
    const filter = {"_id": req.params.employeeId};
    Employee.findOneAndUpdate(filter, {
      name: req.body.name,
      dateofbirth: req.body.dateofbirth,
      salary: req.body.salary,
      skills: req.body.skills,
      imageurl:req.boby.imageurl
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with ID : " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        return res.status(500).send({
            message: "Error updating employee detail with id " + req.params.employeeId
        });
    });
};

// Delete details of employee (from database) using employeeId
exports.delete = (req, res) => {
    Employee.findOneAndRemove({"_id": req.params.employeeId})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee detail deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    });
};

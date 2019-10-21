module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // create new entry (details of employee)
    app.post('/employees', employees.create);

    // Retrieve all employee details
    app.get('/employees', employees.findAll);

    // Retrieve a details of particular employee
    app.get('/employees/:employeeId', employees.findOne);

    // Update employee details
    app.put('/employees/:employeeId', employees.update);

    // Delete employee details from database
    app.delete('/employees/:employeeId', employees.delete);
}

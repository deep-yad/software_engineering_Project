const Issue = require("../models/issue");

//show the list of issues 
const index = (req, res, next) => {
    Issue.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured!"
        }
        )
    })
}

//show single issue
const show = (req, res, next) => {
    let issue_id = req.body.issue_id
    Issue.findById(issue_id)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        message: "An error occured!"
    })
}

// add new issue
const store = (req, res, next) => {
    let issue = new Issue({
        issue_id: req.body.issue_id,
        machine_id: req.body.machine_id,
        person_id: req.body.person_id,
        is_returnable: req.body.is_returnable,
        due_date: req.body.due_date,
        order_is_completed: req.body.order_is_completed,
        description: req.body.description
    })
    issue.save()
    .then(response => {
        res.json({
            message: "Issue added successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured!"
        })
    })
}

// update an issue
const update = (req, res, next) => {
    let issue_id = req.body.issue_id

    let updatedData = {
        issue_id: req.body.issue_id,
        machine_id: req.body.machine_id,
        person_id: req.body.person_id,
        is_returnable: req.body.is_returnable,
        due_date: req.body.due_date,
        order_is_completed: req.body.order_is_completed,
        description: req.body.description
    }

    Issue.findByIdAndUpdate(issue_id, {$set, updatedData})
    .then(response => {
        res.json({
            message: "Issue updated successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured!"
        })
    })
}

// delete an issue
const destroy = (req, res, next) => {
    let issue_id = req.body.issue_id
    Issue.findOneAndRemove(issue_id)
    .then(response => {
        res.json({
            message: "Issue deleted successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured!"
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}
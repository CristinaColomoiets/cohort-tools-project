const {model, Schema} = require("mongoose");

const cohortSchema = new Schema(
    {
        inProgress: {
            type: Boolean
        },
        cohortSlug: {
            type: String
        },
        cohortName: {
            type: String
        },
        program: {
            type: String
        },
        campus: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: String
        },
        programManager: {
            type: String
        },
        leadTeacher: {
            type: String
        },
        totalHours:{ 
           type: Number
        } 
    },
    {
        timestamps: true
    }
)

const Cohort = model("Cohort", cohortSchema);

module.exports = Cohort
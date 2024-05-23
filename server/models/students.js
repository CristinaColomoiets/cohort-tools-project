const {model, Schema} = require("mongoose");

const studentSchema = new Schema(
    {
        _id: Schema.ObjectId,
        firstName: {
            type: String
        },
        lastName: {
            type:String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        linkedinUrl: {
            type: String
        },
        languages: {
            type: [String]
        },
        program: {
            type: String
        },
        background: {
            type: String
        },
        image: {
            type: String
        },
        projects: {
            type: []
        }, 
        cohort: {
            type: Schema.ObjectId,
            ref: 'Cohort'
        }
    },
    {
        timestamps: true
    }
)

const Student = model("Student", studentSchema);

module.exports = Student
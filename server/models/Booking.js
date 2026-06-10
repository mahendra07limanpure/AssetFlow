const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        asset: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
                "issued",
                "returned"
            ],
            default: "pending",
        },
        issueDate: {
            type: Date,
        },

        returnDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
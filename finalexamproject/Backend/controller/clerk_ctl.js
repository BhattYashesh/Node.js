const clerkSchema = require('../model/clerk_schema');

// Get all clerks
module.exports.getClerks = async (req, res) => {
    try {
        const clerks = await clerkSchema.find();
        res.status(200).json(clerks);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching clerks', error });
    }
};

// Add a new clerk
module.exports.addClerk = async (req, res) => {
    try {
        await clerkSchema.create(req.body);
        res.status(201).json({ msg: 'Clerk added successfully' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error adding clerk', error });
    }
}

// Update a clerk
module.exports.updateClerk = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClerk = await clerkSchema.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: 'Clerk updated successfully', clerk: updatedClerk });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error updating clerk', error });
    }
}

// Delete a clerk
module.exports.deleteClerk = async (req, res) => {
    try {
        const { id } = req.params;
        await clerkSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Clerk deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error deleting clerk', error });
    }
}

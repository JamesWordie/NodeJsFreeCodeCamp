const notFound = (req, res) => res.status(404).json("Roue does not exist.");

module.exports = notFound;

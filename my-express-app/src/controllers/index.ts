class IndexController {
    async getIndex(req, res) {
        res.send('Welcome to the API');
    }

    async createItem(req, res) {
        // Logic to create an item in the database
    }

    async getItem(req, res) {
        // Logic to get an item from the database
    }
}

export default IndexController;
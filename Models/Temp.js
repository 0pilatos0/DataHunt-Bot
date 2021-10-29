const Model = require('../Core/Model');

module.exports = class ProfilePicture extends Model{
    static table = "pi_temps";
    constructor() {
        super();
    }
}
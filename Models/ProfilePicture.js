const Model = require('../Core/Model');

module.exports = class ProfilePicture extends Model{
    static table = "profile_pictures";
    constructor() {
        super();
    }
}
var db = require('mongoose');
var Schema = Mongoose.Schema;

var PropertiesSchema = new Schema({
     name: {type: String, required: true},
     address: String,
     contacts: Array,
     description: String
    }
});


var Properties = db.model('Properties', PropertiesSchema);

module.exports = Properties;
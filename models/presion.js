var mongoose = require('mongoose');

var PresionSchema = new mongoose.Schema({
	alta: Number,
  baja: Number,
  pulsaciones: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PresionArterial', PresionSchema);

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const timeSchema = new Schema({
  nome: String,
  slug: {
    type: String,
    unique: true
  },
  descricao: String
});

timeSchema.pre('save', function(next) {
  this.slug = slugify(this.nome);
  next();
});

const timeModel = mongoose.model('Time', timeSchema);

module.exports = timeModel;

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}
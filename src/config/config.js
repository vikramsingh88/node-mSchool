const PORT = process.env.PORT || 3000
//const DB_PATH = 'mongodb://127.0.0.1:27017/mSchool'
const DB_PATH = process.env.Data_base_url;
const secret = process.env.secret;

module.exports = {
    PORT,
    DB_PATH,
    'secret' : secret
}
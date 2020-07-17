const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const ong_id = request.headers.authorization;
        const incidentes = await connection('Incidente').where('Ong_id', ong_id).select('*');

        return response.json(incidentes);
    }
}
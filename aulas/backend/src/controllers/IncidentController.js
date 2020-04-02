const connection = require('../database/connection');

module.exports = {
    async create(request,response){
        const {titulo,descricao,valor} = request.body;
        const ong_id = request.headers.authorization;

        const id = (await connection("incidents").insert({
            titulo,
            descricao,
            valor,
            ong_id
        }))[0];

        return response.json({id});
    },

    async allByOng(request,response){

        const ong_id = request.headers.authorization;

        const incidents = await connection("incidents")
        .where('ong_id',ong_id)
        .select("*");

        return response.json(incidents);
    },

    async all(request, response){

        const {page = 1} = request.query;

        const count = (await connection("incidents").count())[0];


        const incidents = await connection("incidents")
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select("incidents.*",'ongs.nome','ongs.email','ongs.whatsapp','ongs.cidade','ongs.uf');

        response.header('X-Total-Count',count['count(*)']);

        return response.json({incidents})
    },

    async delete(request,response){
        const { id } = request.params;
        const ongLogada = request.headers.authorization;

        const incidentOng = await connection("incidents")
        .where('id',id)
        .select('ong_id')
        .first();

        if(incidentOng.ong_id != ongLogada){
            return response.status(401).json({error : 'Operação não permitida.'});
        }

        await connection("incidents").where("id",id).delete();

        return response.status(204).send();
    }
}
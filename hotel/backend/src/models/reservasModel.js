const conexao = require('../database/conexao')
const moment = require('moment')

const listarReservas = async () => {
    try {
        const conn = await conexao()
        const [rows] = await conn.query(
            'SELECT * FROM hotel_recanto.reserva r INNER JOIN usuario u ON r.id_usuario = u.id_usuario INNER JOIN quarto q ON r.id_quarto = q.id_quarto INNER JOIN acomodacao a ON q.id_acomodacao = a.id_acomodacao ORDER BY id_reserva desc'
        )
        conn.end()
        return rows
    } catch (error) {
        return error
    }
}

const listarReserva = async (id) => {
    try {
        const conn = await conexao()
        const [rows] = await conn.query(
            `SELECT r.id_reserva, r.checkin, r.checkout, r.confirmacao, r.data, r.qtdpessoas, r.total, r.totaldesconto, r.totalcomdesconto, r.servicos, r.id_usuario, r.id_quarto, u.nome, u.sobrenome, a.tipo, a.preco, q.status, q.numero, q.id_acomodacao FROM hotel_recanto.reserva r INNER JOIN usuario u ON r.id_usuario = u.id_usuario INNER JOIN quarto q ON r.id_quarto = q.id_quarto INNER JOIN acomodacao a ON q.id_acomodacao = a.id_acomodacao WHERE id_reserva = ${id}`
        )
        conn.end()
        return rows
    } catch (error) {
        return error
    }
}

const atualizarReserva = async (
    id,
    {
        checkin,
        checkout,
        qtdpessoas,
        total,
        totaldesconto,
        totalcomdesconto,
        data,
        confirmacao,
        servicos,
        idUsuario,
        idQuarto,
        idQuartoAnterior,
    }
) => {
    try {
        const conn = await conexao()
        const checkin1 = moment(checkin).format('YYYY-MM-DD')
        const checkout1 = moment(checkout).format('YYYY-MM-DD')
        const data1 = moment(data).format('YYYY-MM-DD')
        const values = [
            checkin1,
            checkout1,
            qtdpessoas,
            total,
            totaldesconto,
            totalcomdesconto,
            data1,
            confirmacao,
            servicos,
            idUsuario,
            idQuarto,
            idQuartoAnterior,
        ]
        console.log(values)
        await conn.query(
            `UPDATE reserva SET checkin=?, checkout=?, qtdpessoas=?, total=?, totaldesconto=?, totalcomdesconto=?, data=?, confirmacao=?, servicos=?, id_usuario=?, id_quarto=? WHERE id_reserva = ${id}`,
            values
        )
        await conn.query(
            `UPDATE quarto SET status='livre' WHERE id_quarto=${idQuartoAnterior}`
        )
        await conn.query(
            `UPDATE quarto SET status='ocupado' WHERE id_quarto=${idQuarto}`
        )
        // conn.end()
    } catch (error) {
        return error
    }
}

const inativarReserva = async (id) => {
    try {
        const conn = await conexao()
        const confirmacao = 'cancelado'
        return await conn.query(
            `UPDATE reserva INNER JOIN quarto ON reserva.id_quarto = quarto.id_quarto SET reserva.confirmacao=?, quarto.status= 'livre' WHERE id_reserva = ${id}`,
            confirmacao
        )
    } catch (error) {
        return error
    }
}

const arquivarReserva = async (id) => {
    try {
        const conn = await conexao()
        const confirmacao = 'arquivado'
        return await conn.query(
            `UPDATE reserva INNER JOIN quarto ON reserva.id_quarto = quarto.id_quarto SET reserva.confirmacao=?, quarto.status= 'livre' WHERE id_reserva = ${id}`,
            confirmacao
        )
    } catch (error) {
        return error
    }
}

const cadastrarReserva = async (data) => {
            const checkin1 = moment(data.checkin).format('YYYY-MM-DD')
            const checkout1 = moment(data.checkout).format('YYYY-MM-DD')
            const data1 = moment(data.data).format('YYYY-MM-DD')
            const confirmacao = 'confirmado'
            const idQuarto1 = data.idQuarto
    const values = [
        checkin1,
        checkout1,
        data.qtdpessoas,
        data.total,
        data.totalcomdesconto,
        data.cupomDesconto,
        data.totaldesconto,
        data.noites,
        data.servicos,
        confirmacao,
        data1,
        data.idUsuario,
        idQuarto1
    ]
    try {
        const conn = await conexao()
        await conn.query(
            `INSERT INTO hotel_recanto.reserva (checkin,checkout,qtdpessoas,total,totalcomdesconto,cupomDesconto,totaldesconto,noites,servicos,confirmacao,data,id_usuario,id_quarto) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            values
        )
        await conn.query(
            `UPDATE quarto SET status='ocupado' WHERE id_quarto=${idQuarto1}`
        )
        conn.end()
    } catch (error) {
        // throw error
        // console.log(error)
        return 'erro'
    }
}

const myBookings = async (id) => {
    try {
        const conn = await conexao()
        const [rows] = await conn.query(
            "SELECT r.id_reserva, r.checkin, r.checkout, r.data, r.qtdpessoas, r.totalcomdesconto, r.servicos, r.total, r.totaldesconto, r.noites, a.tipo, a.preco, a.imagem, a.descricao FROM hotel_recanto.reserva r INNER JOIN usuario u ON r.id_usuario = u.id_usuario INNER JOIN quarto q ON r.id_quarto = q.id_quarto INNER JOIN acomodacao a ON q.id_acomodacao = a.id_acomodacao WHERE u.id_usuario = ? and r.confirmacao= 'confirmado'",
            id
        )
        conn.end()
        return rows
    } catch (error) {
        console.log(error)
        return error
    }
}

// const deleteMyBookings = async (codigoReserva) => {
//     try {
//         const conn = await conexao()
//         const [rows] = await conn.query(
//             'DELETE FROM hotel_recanto.reserva_teste WHERE codigo = ?',
//             codigoReserva
//         )
//         conn.end()
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }

module.exports = {
    listarReservas,
    listarReserva,
    atualizarReserva,
    inativarReserva,
    arquivarReserva,
    cadastrarReserva,
    myBookings,
    // deleteMyBookings,
}

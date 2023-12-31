const conexao = require('../database/conexao.js')

const listarUsuarios = async () => {
    try {
        const conn = await conexao()
        const [rows] = await conn.query(
            'SELECT * FROM usuario ORDER BY id_usuario desc'
        )
        return rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const listarUsuario = async (id) => {
    try {
        const conn = await conexao()
        const [rows] = await conn.query(
            `SELECT * FROM usuario WHERE id_usuario = ${id}`
        )
        return rows
    } catch (error) {
        return error
    }
}

const cadastrarUsuario = async (dados) => {
    try {
        const conn = await conexao()
        const values = [
            dados.nome,
            dados.sobrenome,
            dados.email,
            dados.nivel,
            dados.status,
            dados.senha,
        ]
        const [rows] = await conn.query(
            `INSERT INTO usuario (nome, sobrenome, email, nivel, status, senha) VALUES (?,?,?,?,?,?)`,
            values
        )
    } catch (error) {
        return error
    }
}

const loginUsuario = async (email) => {
    try {
        const conn = await conexao()
        const values = [email]
        const [rows] = await conn.query(
            `SELECT * FROM usuario WHERE email=?`,
            values
        )
        return rows
    } catch (error) {
        return error
    }
}

const atualizarUsuario = async (
    id,
    { nome, sobrenome, email, nivel, status, senha }
) => {
    try {
        const conn = await conexao()
        const values = [nome, sobrenome, email, nivel, status, senha]
        await conn.query(
            `UPDATE usuario SET nome=?, sobrenome=?, email=?, nivel=?, status=?, senha=? WHERE id_usuario = ${id}`,
            values
        )
        conn.end()
    } catch (error) {
        return error
    }
}

const inativarUsuario = async (id) => {
    try {
        const conn = await conexao()
        const status = 'inativo'
        return await conn.query(
            `UPDATE usuario SET status=? WHERE id_usuario = ${id}`,
            status
        )
    } catch (error) {
        return error
    }
}

// const pesquisarUsuario = async (nome,sobrenome) => {
//     try {
//         const conn = await conexao()
//         const values = [nome, sobrenome]
//         const [rows] = await conn.query(
//             'SELECT * FROM usuario WHERE nome=? and sobrenome=?', values
//         )
//         console.log(rows);
//         return rows
//     } catch (error) {
//         return error
//     }
// }

module.exports = {
    listarUsuarios,
    listarUsuario,
    cadastrarUsuario,
    loginUsuario,
    inativarUsuario,
    atualizarUsuario,
    // pesquisarUsuario,
}

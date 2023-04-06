const express = require('express')
const router = express.Router()
const uploadImage = require('../middleware/uploadImage')
const acomodacoesController = require('./../controllers/acomodacoesController')

router.get('/', acomodacoesController.listarAcomodacoes)
router.get('/quartos', acomodacoesController.listarQuartos)
router.get('/:id', acomodacoesController.listarAcomodacao)
router.get('/quartos/:id', acomodacoesController.listarQuarto)
router.post('/', uploadImage.single('foto'), acomodacoesController.cadastrarAcomodacao)
router.post(
    '/quartos',
    acomodacoesController.cadastrarQuarto
)
router.patch('/:id', acomodacoesController.atualizarAcomodacao)
router.delete('/:id', acomodacoesController.removerAcomodacao)

module.exports = router
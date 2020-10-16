import { Request, Response} from 'express'
// 'getRepository' possui a regra de negócio para fazer as alterações no banco de dados
import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanege';

export default {
  async index(req: Request, res: Response) {
    const ophanagesRepository = getRepository(Orphanages);

    const listOrphanages = await ophanagesRepository.find()

    return res.json(listOrphanages)
  },


  async show(req: Request, res: Response) {

    const { id } = req.params;

    const ophanagesRepository = getRepository(Orphanages);

    const findOrphanage = await ophanagesRepository.findOneOrFail(id)

    return res.json(findOrphanage)
  },


  async create (req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const ophanagesRepository = getRepository(Orphanages);

    const newOphanage = ophanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    })

    await ophanagesRepository.save(newOphanage)

    res.status(201).json(newOphanage)
  }
}

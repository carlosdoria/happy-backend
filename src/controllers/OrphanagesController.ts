import { Request, Response} from 'express'
// 'getRepository' possui a regra de negócio para fazer as alterações no banco de dados
import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanage';
import OphanageViews from '../views/ophanageViews'

export default {
  async index(req: Request, res: Response) {
    const ophanagesRepository = getRepository(Orphanages);

    const listOrphanages = await ophanagesRepository.find({
      //responsável por mostrar as imagens no response
      relations: ['images']
    })

    return res.json(OphanageViews.renderMany(listOrphanages))
  },


  async show(req: Request, res: Response) {

    const { id } = req.params;

    const ophanagesRepository = getRepository(Orphanages);

    const findOrphanage = await ophanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.json(OphanageViews.render(findOrphanage))
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

    // Express.Multer.File[] utilizado para informar que a const é um array de arquivos
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const newOphanage = ophanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    await ophanagesRepository.save(newOphanage)

    res.status(201).json(newOphanage)
  }
}

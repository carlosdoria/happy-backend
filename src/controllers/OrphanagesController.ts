import { Request, Response} from 'express'
// 'getRepository' possui a regra de negócio para fazer as alterações no banco de dados
import { getRepository } from 'typeorm';
import * as Yup from 'yup'

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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().moreThan(0).required(),
      longitude: Yup.number().moreThan(0).required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
    })

    await schema.validate(data, {
      // permite que analise todos os campos e informe todos os errors
      abortEarly: false,
    })

    const newOphanage = ophanagesRepository.create(data);

    await ophanagesRepository.save(newOphanage)

    res.status(201).json(newOphanage)
  }
}

import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({ // diz onde vai ser armazenado os arquivos
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (res, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    }
  })
}

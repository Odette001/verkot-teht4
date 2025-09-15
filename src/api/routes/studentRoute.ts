import express, {Request} from 'express';
import {
  studentDelete,
  studentGet,
  studentListGet,
  studentPost,
  studentPut,
} from '../controllers/studentController';
import multer, {FileFilterCallback} from 'multer';
import {body, param} from 'express-validator';

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({dest: './uploads/', fileFilter});
const router = express.Router();

// no generics here because of types in controllers
router
  .route('/')
  .get(studentListGet)
  .post(
    upload.single('image'),
    body('student_name').notEmpty().withMessage('Invalid value').escape(),
    body('birthdate').isDate().withMessage('Invalid value'),
    studentPost
  );

router
  .route('/:id')
  .get(param('id').isInt().withMessage('Invalid value: id'), studentGet)
  .put(
    param('id').isInt().withMessage('Invalid value: id'),
    body('student_name').escape().optional(),
    body('birthdate').isDate().optional(),
    studentPut
  )
  .delete(param('id').isInt().withMessage('Invalid value: id'), studentDelete);

export default router;

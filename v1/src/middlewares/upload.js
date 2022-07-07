import * as uuid from 'uuid';
import multer from 'multer';

const upload = ({ folder, fileType }) =>
  multer({
    storage: multer.diskStorage({
      destination: `v1/src/uploads/${folder}`,
      filename: function (req, file, callback) {
        const [type, extension] = file.mimetype.split('/');
        if (fileType !== type) return callback(new Error('Invalid file type'));
        file.filename = `${uuid.v4()}.${extension}`;
        callback(null, file.filename);
      },
    }),
  });
export default upload;

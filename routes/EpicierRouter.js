var express = require('express');
var router = express.Router();
const EpicierCtrl = require('../controllers/EpicierCtrl')
const multer = require("multer");
const upload = multer({
  limits: {
    //Max of file 5Mo= 5000000 bytes.
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(
        new Error(
          "too large"
        )
      );
    }
    cb(undefined, true);
  },
});



router.post('/Register', upload.single("uploadbar"), EpicierCtrl.register);
router.post('/Login', EpicierCtrl.login);
router.get('/getEpicier/:id', EpicierCtrl.getEpicier);
router.patch('/validate/:id', EpicierCtrl.validEpicier);
router.get('/EpicierInvalid', EpicierCtrl.getEpicierInvalid)
router.get('/CountEpicier', EpicierCtrl.CountEpicier)
router.patch('/update/:id', EpicierCtrl.UpdateEpicier);
router.delete('/deleteEpicier/:id', EpicierCtrl.deleteEpicier)
router.get('/logout', EpicierCtrl.LogOut)


module.exports = router;
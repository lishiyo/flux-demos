import { Router } from 'express';
let router = module.exports = Router();
import login from '../auth/login';

// ========= CHIRPS API ========

import locallyDb from 'locallydb';
let db = new locallyDb('./.data');
let chirps = db.collection('chirps');

router.route('/api/chirps')
    .all(login.required)
    .get((req, res) => {
        res.json(chirps.toArray());
    })
    .post((req, res) => {
        let chirp = req.body;
        chirp.userId = req.user.cid;

        // TO BE REMOVED
        chirp.username = req.user.username;
        chirp.fullname = req.user.fullname;
        chirp.email = req.user.email;

        let chirpId = chirps.insert(chirp);
        res.json(chirps.get(id));
    });

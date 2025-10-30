const firebaseService = require('../services/firebase.service');

// Verify user token
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await firebaseService.verifyIdToken(token);
    
    res.json({ 
      success: true, 
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email
      }
    });
  } catch (error) {
    next(error);
  }
}

// Get user info
async function getUserInfo(req, res, next) {
  try {
    const user = await firebaseService.getUser(req.user.uid);
    res.json({ 
      success: true, 
      data: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyToken,
  getUserInfo
};

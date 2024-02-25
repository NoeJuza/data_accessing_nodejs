/**
 * @typedef {Object} User
 * @property {String} mail
 * @property {String} name
 * @property {String} hash
 * @property {Date} creationDate
 */

/**
 * 
 * @param {String} mail 
 * @param {String} name 
 * @param {String} hash 
 * @param {Date} creationDate 
 * @returns {User} 
 */
const createUser = (mail,name,hash,creationDate) => ({mail,name,hash,creationDate})

export {createUser}
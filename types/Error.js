/**
 * @typedef {Object} Error
 * @property {Number} code
 * @property {String} message 
 */
const createError = (code,message) => ({code,message})
export {createError}
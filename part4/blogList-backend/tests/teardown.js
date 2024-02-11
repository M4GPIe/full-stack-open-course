/*since mongoose can have some problems with jest, 
*we have to add this specific form of teardown to jest configuration
*see package.json jest global teardown
*/
module.exports = () => {
    process.exit(0)
}
const zod = require('zod')

const UserSchema = zod.object({
    Username: zod.string(),
    Password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

module.exports = {
    UserSchema
}
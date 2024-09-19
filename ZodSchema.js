const zod = require('zod')

const UserSchema = zod.object({
    Username: zod.string(),
    Password: zod.string(),
    FirstName: zod.string(),
    LastName: zod.string()
})

module.exports = {
    UserSchema
}
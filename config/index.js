const allowed = process.env.ALLOWED_TYPES.split(',')

const large = {
    w: parseInt(process.env.IMG_LARGE.split('x')[0]),
    h: parseInt(process.env.IMG_LARGE.split('x')[1])
}
const medium = {
    w: parseInt(process.env.IMG_MEDIUM.split('x')[0]),
    h: parseInt(process.env.IMG_MEDIUM.split('x')[1])
}
const  thumb = {
    w: parseInt(process.env.IMG_THUMB.split('x')[0]),
    h: parseInt(process.env.IMG_THUMB.split('x')[1])
}

module.exports = {
    allowed,
    sizes: {
        large,
        medium,
        thumb
    }
}

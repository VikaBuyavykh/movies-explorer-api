const videoUrlRegex = /(https?:\/\/)([w]{3}\.)?([\w-.~:/?#[\]@!$&'()*+,;=]{1,}\.[\w]{1,3})(\/[\w-.~:/?#[\]@!$&'()*+,;=]{1,})*/i;
const imageUrlRegex = /\/uploads\/\w+\.jpeg/i;
module.exports = { videoUrlRegex, imageUrlRegex };

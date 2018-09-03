// Transform generated <php> tags to real PHP tags and rename files

const tag = /<php>([\S\s]*?)<\/php>\n?/g
const echo = /<php echo>([\S\s]*?)<\/php>/g
const only = /<php only>([\S\s]*?)<\/php>/g

function recodeEntities(content) {
	return content
		.replace(/&amp;/gi, '&')
		.replace(/&gt;/gi, '>')
		.replace(/&lt;/gi, '<')
}

module.exports = {
	match: name => name.endsWith('.php.html'),
	rename: name => name.replace('.php.html', '.php'),
	replace: f => f
		.replace(tag, (all, content) => `<?php ${recodeEntities(content)} ?>`)
		.replace(echo, (all, content) => `<?= ${recodeEntities(content)} ?>`)
		.replace(only, (all, content) => `<?php ${recodeEntities(content)}`)
}

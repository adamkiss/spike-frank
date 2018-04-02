/**
 * Different version of spike-page-id, specific to my workflow
 * More info https://github.com/static-dev/spike-page-id
 */

module.exports = ctx => {
	// get path from site root like /subdir/file.ext
	let url = ctx.resourcePath.replace(ctx.context, '')
	// split at dot and get first part (@todo more robust in future)
	url = url.split('.')[0]
	// append hash, now it is like: /go/to/index/
	url = url+'/'
	// generate ID
	const id = url.slice(1,-1).replace('/','-')
	// finally remove index/
	url = url.replace('index/','')
	
	return { id, url }
}
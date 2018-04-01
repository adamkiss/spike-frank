// If PHP block (or anything) precedes doctype, Reshape freaks out.
// This is the fix

module.exports = {
	match: name => name.endsWith('.html') || name.endsWith('.php'),
	replace: f => f.replace('<doctype>html</doctype>', '<!DOCTYPE html>')
}
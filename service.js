const etag = require('etag');
const express = require('express');
const app = express();

let port = process.env.PORT || (process.env.NODE_ENV == 'production'?3000:3001);

if ( process.env.NODE_ENV == 'production') { // attach build directory if production env
	app.use(express.static('build'));
}

app.get('/api/hello', (req, res) => {
	let data = {hello: 'world'};
	let hash = etag(JSON.stringify(data));
	if ( req.headers['if-none-match'] && hash.replace(/\"/g, '') == req.headers['if-none-match'].replace(/\"/g, '') ) {
		res.status(304).send('Not Modified');
	} else {
		res.setHeader('ETag', tag);
		res.json(data);
		res.end();
	}
});

app.listen(port, () => {
	console.log('Express listening on port '+port)
});

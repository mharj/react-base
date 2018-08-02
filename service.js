const etag = require('etag');
const express = require('express');
const app = express();
app.set('etag', false);
app.set('x-powered-by', false);

let port = process.env.NODE_ENV !== 'production' ? 3001 : process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') { // attach build directory if production env
	app.use(express.static('build'));
}

app.get('/api/hello', (req, res) => {
	let data = {hello: 'world'};
	let etagHash = etag(JSON.stringify(data));
	if (req.headers['if-none-match'] && etagHash.replace(/\"/g, '') === req.headers['if-none-match'].replace(/\"/g, '')) {
		res.status(304).send('Not Modified');
	} else {
		res.setHeader('ETag', etagHash);
		res.json(data);
		res.end();
	}
});

app.listen(port, () => {
	console.log('Express listening on port ' + port);
});

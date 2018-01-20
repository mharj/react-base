const express = require('express');
const app = express();

let port = process.env.PORT || (process.env.NODE_ENV == 'production'?3000:3001);

if ( process.env.NODE_ENV == 'production') { // attach build directory if production env
	app.use(express.static('build'));
}

app.get('/api/hello', (req, res) => {
	res.json({hello: 'world'})
	res.end();
});

app.listen(port, () => {
	console.log('Express listening on port '+port)
});

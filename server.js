const fs = require("fs");
const path = require("path");
const http = require("http");

const getContentType = (filePath) => {
	let extName = path.extname(filePath);
	if (extName === ".html") {
		return "text/html";
	} else {
		return "text/css";
	}
};

const server = http.createServer(function (req, res) {
	let filePath = path.join(__dirname, req.url === "/" ? "home.html" : req.url);
	let contentType = getContentType(filePath);

	fs.readFile(filePath, "utf-8", (err, content) => {
		if (content) {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(content);
		}

		if (err) {
			if (err.code === "ENOENT") {
				res.end("<h1>Page Not Found!!!<h1>");
			} else {
				res.end("<h1>Server Error!!!</h1>");
			}
		}
	});
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

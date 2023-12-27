const express = require("express");
const detail = express.Router();
const path = require('path');

// Định nghĩa đường dẫn tuyệt đối đến thư mục 'public'
const publicPath = path.join(__dirname, "../public");

detail.get("/:id", (req, res) => {
    // Sử dụng đường dẫn tuyệt đối để tránh xung đột
    res.sendFile(path.join(publicPath, "question-detail.html"));
});

// Sử dụng express.static để phục vụ các tệp tĩnh
detail.use(express.static(publicPath));

module.exports = detail;

// CHATGPT làm hộ, em chịu

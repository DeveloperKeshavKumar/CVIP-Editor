const express = require("express");
const app = express();

const bp = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bp.json());

app.use("/codemirror", express.static("C:/Users/kumar/Projects/CVIP/Editor/codemirror"));

app.get("/", function (req, res) {
    compiler.flush(() => {
        console.log("Temporary Files Deleted!!");
    })
    res.sendFile("C:/Users/kumar/Projects/CVIP/Editor/index.html");
});

app.post("/compile", async function (req, res) {
    const code = req.body.code;
    const input = req.body.input;
    const lang = req.body.lang;

    try {
        const envData = { OS: "windows", cmd: "", options: { timeout: 1000 } };

        if (lang === "C++") {
            envData.cmd = "g++";

            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            }
        } else if (lang === "Java") {
            envData.cmd = "javac";

            if (!input) {
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            }
        } else if (lang === "Python") {
            envData.cmd = "python";

            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.status(500).json({ Output: "Error" });
                    }
                });
            }
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ Output: "Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

import * as colors from "colors";

const compileOutput = (PORT: number) => {
    console.log(colors.cyan("⚡️[server]") + ` Server is running at ` + `http://localhost:${PORT}`.green);
}

export default compileOutput;


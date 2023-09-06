import initialize from "ezpsy-server" 
import context from "./context.json"
import schema from "./schema.json"

const agc = await initialize({
    context,
    authConfig: [
        {
            mode: 1,
            saveMode: 0,
            tag: "Ezpsy_Auth"
        }
    ],
    DBZone: ["Ezpsy"],
    schema
})

export default agc
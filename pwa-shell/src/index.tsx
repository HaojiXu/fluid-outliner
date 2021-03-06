import _debug from "debug"

import React from "react"
import { render } from "react-dom"
import { App } from "../../core/components/App"
import { installOfflinePlugin } from "../../core/utils/offline-plugin-runtime"

const debug = _debug("fluid-outliner:index")

// @ts-ignore
import "typeface-roboto"

debug("Installing Service Workers")
installOfflinePlugin()

debug("Bootstrapping React root")

document.addEventListener("DOMContentLoaded", () => {
    render(<App />, document.getElementById("root"))
})

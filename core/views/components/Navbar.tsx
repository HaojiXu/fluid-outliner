import { AppBar, IconButton, Toolbar, Typography, Tooltip, Input } from "@material-ui/core"
import { StyledComponentProps } from "@material-ui/core/styles"
import React from "react"
import flow from "lodash/flow"
// @ts-ignore
import Octicon from "react-octicon"
import { observer } from "mobx-react"
import { withStyles } from "../helpers/type-overrides"
import { RepositoryViewModel } from "../models/RepositoryViewModel"

declare var SHELL_ID: string

const styles = {
    root: {
        position: "fixed" as "fixed",
        top: 0,
        left: 0,
        right: 0,
    },
    icon: {
        fontSize: "1.5rem",
        position: "relative" as "relative",
    },
    searchInputWrapper: {
        padding: "3px",
        background: "rgba(255, 255, 255, 0.3)",
        color: "white",
        borderRadius: "4px",
        maxWidth: "1200px",
        width: "100%",
        margin: "auto",
        display: "flex",
        "@media(max-width: 700px)": {
            display: "none",
        },
    },
}

interface INavbarProps extends StyledComponentProps<keyof typeof styles> {
    repository: RepositoryViewModel
    toggleDrawer: () => void
    searchRef: React.Ref<any>
    drawerOpen: boolean
}

const injectStyles = withStyles<keyof typeof styles, INavbarProps>(styles)

const decorate = flow(
    observer,
    injectStyles
)

export const Navbar = decorate(({ classes, toggleDrawer, searchRef, drawerOpen, repository }: INavbarProps) => (
    <AppBar position="static" className={classes!.root}>
        <Toolbar>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                }}
            >
                <div style={{ flexBasis: "300px", display: "flex" }}>
                    <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer}>
                        <Octicon name={drawerOpen ? "diff-removed" : "three-bars"} className={classes!.icon} />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit"
                        style={{
                            flex: "0 1 0%",
                            whiteSpace: "nowrap",
                            padding: "0 10px 0 0",
                            fontWeight: 500,
                            lineHeight: "3rem",
                        }}
                    >
                        Fluid Outliner{" "}
                        <span
                            style={{
                                position: "relative",
                                background: "orange",
                                color: "#6d00a0",
                                fontSize: "0.8rem",
                                top: "-10px",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        >
                            Beta
                        </span>
                    </Typography>
                </div>
                <div style={{ flex: 1, paddingTop: "3px" }}>
                    <Input
                        innerRef={searchRef}
                        placeholder="Search ..."
                        className={classes!.searchInputWrapper}
                        inputProps={{
                            style: {
                                padding: "10px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                            },
                        }}
                    />
                </div>
                {SHELL_ID === "PWA" && (
                    <div style={{ flexBasis: "300px", textAlign: "right" }}>
                        <Tooltip title="Save to local file">
                            <IconButton color="inherit" aria-label="Menu" onClick={repository.saveLocally}>
                                <Octicon name="repo-pull" className={classes!.icon} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open local file">
                            <IconButton color="inherit" aria-label="Menu" onClick={() => {}}>
                                <Octicon name="repo-push" className={classes!.icon} />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        </Toolbar>
    </AppBar>
))
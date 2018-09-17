import { computed } from "mobx"

import { Node } from "../../models/OutlineShell"
import { NodeState } from "../../models/OutlineVisitState"
import { OutlineViewModel } from "./OutlineViewModel"
import { autobind } from "../../../node_modules/core-decorators"

export interface NodeViewModelParams extends NodeState {
    outline: OutlineViewModel
}

export class NodeViewModel implements NodeViewModelParams {
    public node: Node
    public isCollapsed: boolean
    public level: number
    public numChildren: number
    public outline: OutlineViewModel
    public canShiftBackward: boolean
    public canShiftForward: boolean

    constructor({
        node,
        isCollapsed,
        level,
        outline,
        numChildren,
        canShiftForward,
        canShiftBackward,
    }: NodeViewModelParams) {
        this.outline = outline
        this.node = node
        this.isCollapsed = isCollapsed
        this.level = level
        this.numChildren = numChildren
        this.canShiftForward = canShiftForward
        this.canShiftBackward = canShiftBackward
    }

    get id() {
        return this.node.id
    }

    get hasChildren() {
        return this.numChildren > 0
    }

    get outlineShellProxy() {
        return this.outline.outlineShellProxy
    }

    get outlineVisitStateProxy() {
        return this.outline.outlineVisitStateProxy
    }

    @computed
    get isActive() {
        return this.outline.activeNodeId === this.id
    }

    @computed
    get isUnderEdit() {
        return this.outline.nodeUnderEdit === this.id
    }

    @autobind
    async addChildNode() {
        const id = await this.outlineShellProxy.addNode(this.id)
        if (id) {
            this.outline.nodeUnderEdit = id
        }
        return id
    }

    @autobind
    async addSiblingNode() {
        const id = await this.outlineShellProxy.addNode(this.node.parentId)
        if (id) {
            this.outline.nodeUnderEdit = id
        }
        return id
    }

    @autobind
    enableEditing() {
        this.outline.nodeUnderEdit = this.id
    }

    @autobind
    disableEditing() {
        this.outline.nodeUnderEdit = null
    }

    @autobind
    toggleCollapse() {
        this.outlineVisitStateProxy.toggleCollapsed(this.id)
    }

    @autobind
    shiftForward() {
        this.outlineShellProxy.shiftForward(this.id)
    }

    @autobind
    shiftBackward() {
        this.outlineShellProxy.shiftBackward(this.id)
    }

    @autobind
    remove() {
        this.outlineShellProxy.removeNode(this.id)
    }

    @autobind
    activateEditing() {
        this.outline.nodeUnderEdit = this.id
    }

    @autobind
    deactivateEditing() {
        if (this.outline.nodeUnderEdit === this.id) {
            this.outline.nodeUnderEdit = null
        }
    }

    @autobind
    getContent() {
        return this.outlineShellProxy.getContent(this.id)
    }

    @autobind
    setContent(content: string, output?: string) {
        this.outlineShellProxy.setContent(this.id, content, output)
    }

    @autobind
    setFormat(format: string) {
        this.outlineShellProxy.setFormat(this.id, format)
    }
}

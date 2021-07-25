# TreeView

## EVENTS
onDidChangeSelection: Event<TreeViewSelectionChangeEvent<T>>

onDidChangeVisibility: Event<TreeViewVisibilityChangeEvent>

onDidCollapseElement: Event<TreeViewExpansionEvent<T>>

onDidExpandElement: Event<TreeViewExpansionEvent<T>>

## STATIC
from(...disposableLikes: {dispose: () => any}[]): Disposable

## CONSTRUCTORS
new TreeView(callOnDispose: Function): TreeView

## PROPERTIES
description?: string

message?: string

selection: T[]

title?: string

visible: boolean

## METHODS
dispose(): any

reveal(element: T, options?: {expand: boolean | number, focus: boolean, select: boolean}): Thenable<void>
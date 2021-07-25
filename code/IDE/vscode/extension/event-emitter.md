# vscode.EventEmitter

## PROPERTIES

event: Event<T>

## METHODS

dispose(): void

fire(data: T): void

<!-- Notify all subscribers of the event. Failure of one or more listener will not fail this function call. -->

## 订阅监听函数来实现,返回一个支持 Disposable 接口的变量。调用 dispose 就可以取消监听。

1. 命名遵循 on[Will|Did]VerbNoun? 模式

   onWill：即将发生  
   onDid：已经发生  
   verb：发生了什么  
   noun：事件所处环境，如果发生在所处的环境则可以不加。

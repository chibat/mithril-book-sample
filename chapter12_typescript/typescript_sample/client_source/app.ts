/// <reference path="mithril.d.ts" />

// モデルクラスTodo: 2つプロパティがある
class Todo {
    description = m.prop<string>(null);
    done = m.prop(false);
   
    constructor(data : any) {
        this.description(data.description);
    }
};

// ビュー・モデル
// 作成可能か判定するロジック
module vm {
    export var list = m.prop<Todo[]>([]);
    export var description = m.prop("");
    export function add() {
        if (vm.description()) {
            vm.list().push(new Todo({description: vm.description()}));
            vm.description("");
        }
    }
}

// コントローラ
function controller() {
}

// ビュー
function view() {
    return m("div", [
        m("input", {onchange: m.withAttr("value", vm.description), value: vm.description()}),
        m("button", {onclick: vm.add}, "追加"),
        m("table", vm.list().map(function (task : Todo) {
            return m("tr", [
                m("td", [
                    m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), value: task.done()})
                ]),
                m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
            ]);
        }))
    ]);
}

m.mount(document.getElementById("root"), {controller: controller, view: view});


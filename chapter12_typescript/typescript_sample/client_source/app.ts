/// <reference path="../typings/mithril/mithril.d.ts" />

// モデルクラスTodo: 2つプロパティがある
class Todo {
    description = m.prop<string>(null);
    done = m.prop(false);
    constructor(data : any) {
        this.description(data.description);
    }
};

// コントローラ
class Controller {
    list = m.prop<Todo[]>([]);
    description = m.prop("");
    add = () => {
        if (this.description()) {
            this.list().push(new Todo({description: this.description()}));
            this.description("");
        }
    }
}

// ビュー
function view(ctrl: Controller) {
    return m("div", [
        m("input", {onchange: m.withAttr("value", ctrl.description), value: ctrl.description()}),
        m("button", {onclick: ctrl.add}, "追加"),
        m("table", ctrl.list().map(function (task : Todo) {
            return m("tr", [
                m("td", [
                    m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), value: task.done()})
                ]),
                m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
            ]);
        }))
    ]);
}

m.mount(document.getElementById("root"), {controller: () => {return new Controller();}, view: view});


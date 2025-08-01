import React from "react";
import Header from "./components/header";
import Todo from "./components/todo";
import './css/main.css'

class App extends React.Component {
    todo = React.createRef();
    render() {

        return (
            <>
                <Header saveList={(list) => this.todo.current.saveList(list)} getList={() => this.todo.current.getList()} />
                <Todo ref={this.todo} />
            </>
        );
    }
}

export default App;
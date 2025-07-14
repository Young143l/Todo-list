import React from 'react'
import '../css/todo.css'

class Todo extends React.Component {
    state = {
        list: [
            // list内部数据存储模板
            // {
            //     val:"name",
            //     isOk:false,
            //     date:"YYYY/MM/DD H:M"
            // },
        ]
    };

    inputVal = React.createRef();

    //保存数据
    saveList = (list) => {
        localStorage.setItem('List', JSON.stringify(list));
        this.setState({
            list
        });
    }

    //获取数据
    getList = () => {
        const list = localStorage.getItem('List');
        return list;
    }

    addTask = () => {
        if (this.inputVal.current.value) {
            const list = this.state.list.concat();
            list.unshift({ val: this.inputVal.current.value, isOk: false, date: this.getTime() });
            this.saveList(list);
            this.inputVal.current.value = "";
        }
    }

    deleteTask = (index) => {
        const list = this.state.list.concat();
        list.splice(index, 1);
        this.saveList(list)
    }

    toTop(index) {
        const list = this.state.list.concat();
        const task = list.splice(index, 1);
        list.unshift(task[0]);
        this.saveList(list);
    }

    taskIsOk(index) {
        const list = this.state.list.concat();
        list[index].isOk = !list[index].isOk;
        if (list[index].isOk) {
            const task = list.splice(index, 1);
            list.push(task[0]);
        } else {
            const task = list.splice(index, 1);
            list.unshift(task[0]);
        }
        this.saveList(list);
    }

    getTime() {
        const now = new Date();

        const year = String(now.getFullYear());
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hour = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');


        return `${year}/${month}/${day} ${hour}:${min}`;
    }

    componentDidMount() {
        const list = this.getList();
        if (list) {
            this.setState({ list: JSON.parse(list) });
        }
    }

    render() {
        return (
            <div className="todo-container">
                <div className="todo-card">
                    <ul>
                        {this.state.list.map((item, key) => (
                            <li key={key} className="todo-item">
                                <div className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${key}`}
                                        // readOnly 
                                        checked={item.isOk}
                                        onChange={() => { this.taskIsOk(key) }}
                                    />
                                    <span className="checkbox"></span>
                                </div>
                                <div className="todo-content">
                                    <span className='val'>{item.val}</span>
                                    <span className='time'>{item.date}</span>
                                </div>

                                <button
                                    className="todo-toTop"
                                    onClick={() => this.toTop(key)}
                                >
                                    ↑
                                </button>
                                <button
                                    className="todo-delet"
                                    onClick={() => this.deleteTask(key)}
                                >
                                    删除
                                </button>
                            </li>
                        ))}
                    </ul>
                    {!this.state.list.length && <div className="todo-noItem">没有任务啦!</div>}
                    <div className="todo-add">
                        <input
                            type="text"
                            placeholder="添加新任务"
                            ref={this.inputVal}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    this.addTask();
                                }
                            }
                            }
                        />
                        <button onClick={() => this.addTask()}>添加</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
import React from "react";
import "../css/header.css";
class Header extends React.Component {
    uploadFile = React.createRef();

    //读取数据文件
    readFile() {
        const file = this.uploadFile.current.files[0];
        console.log(file);
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;

            if (file.name.endsWith('.json')) {
                try {
                    const list = JSON.parse(content);
                    this.props.todo.current.saveList(list);
                } catch (err) {
                    alert(err);
                }
            }
        };

        reader.readAsText(file);
    }
    //保存数据文件
    saveFile() {
        const list = this.props.todo.current.getList();
        const blob = new Blob([list], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();

        URL.revokeObjectURL(url);
    }



    render() {
        return (
            <div className="header-container">
                <div className="header-card">
                    <span className="header-logo">ToDo</span>
                    <button className="header-saveFileButton" onClick={() => {
                        this.saveFile();
                    }}>保存</button>
                    <input className="header-uploadFile" type="file" accept=".json" ref={this.uploadFile} onChange={() => { this.readFile() }} />
                    <button className="header-uploadFileButton" onClick={() => {
                        this.uploadFile.current.click();
                        this.uploadFile.current.value = '';
                    }}>读取</button>
                </div>
            </div>
        )
    }
}

export default Header;

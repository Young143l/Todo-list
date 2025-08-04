import React from "react";
import PropTypes from "prop-types";
import "../css/header.css";
class Header extends React.Component {
    uploadFile = React.createRef();

    //读取数据文件
    readFile() {
        const file = this.uploadFile.current.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            if (file.name.endsWith('.json')) {
                try {
                    const data = JSON.parse(content);
                    if (data.type === "todo") {
                        this.props.saveList(data.list);
                    } else {
                        throw new Error("这不是一个todo配置文件")
                    }
                } catch (err) {
                    alert("出错了:" + err);
                }
            } else {
                alert("这不是一个json文件");
            }
        };

        reader.readAsText(file);
    }
    //保存数据文件
    saveFile() {
        const list = this.props.getList();
        const data = {
            type: "todo",
            list: list
        }
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
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
};

Header.propTypes = {
    saveList: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired
};

export default Header;
